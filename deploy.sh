#!/bin/bash

echo "------------------------------------------------------1. Gateway"

cd server/gateway/

mvn clean package

docker build -t api-gateway:latest .

cd ../../k8s/

kubectl delete replicaset api-gateway-rs --ignore-not-found
kubectl apply -f api-gateway-rs.yaml
kubectl delete service api-gateway --ignore-not-found
kubectl apply -f api-gateway-sc.yaml

cd ..

echo "------------------------------------------------------2. Express server"

cd server/book-service

docker build -t express-service:latest .


cd ../../k8s/

kubectl delete replicaset express-service-rs --ignore-not-found
kubectl apply -f book-service-rs.yaml

kubectl delete service express-service --ignore-not-found
kubectl apply -f book-service-sc.yaml

cd ..

echo "------------------------------------------------------4. book_db database"

cd k8s/

kubectl delete rs mysql-book-db-rs --ignore-not-found
kubectl apply -f book-db-mysql-rs.yaml
kubectl delete service mysql-book-db --ignore-not-found
kubectl apply -f book-db-mysql-sc.yaml

sleep 60

cat sql/book_db.sql | kubectl exec -i $(kubectl get pod -l app=mysql-book-db -o name | head -n 1) -- \
mysql -uroot -pbookstack book_db

cd ..

echo "------------------------------------------------------5. authorization database"

cd k8s/

kubectl delete rs mysql-authorization-rs --ignore-not-found
kubectl apply -f authorization-mysql-rs.yaml
kubectl delete service mysql-authorization --ignore-not-found
kubectl apply -f authorization-mysql-sc.yaml

sleep 60

cat sql/authorization.sql | kubectl exec -i $(kubectl get pod -l app=mysql-authorization -o name | head -n 1) -- \
mysql -uroot -pbookstack authorization

cd ..


echo "------------------------------------------------------3. Authorization server"

cd server/auth-server

mvn clean package -DskipTests

docker build -t auth-server:latest .

cd ../../k8s/

kubectl delete replicaset auth-server-rs --ignore-not-found
kubectl apply -f auth-server-rs.yaml

kubectl delete service auth-server --ignore-not-found
kubectl apply -f auth-server-sc.yaml

cd ..

echo "------------------------------------------------------6. logger server"

cd server/logger/WebApplication1/

dotnet clean && dotnet publish -c Release -o out

docker build -t dotnet-logger:latest .

cd ../../../k8s/

kubectl delete replicaset dotnet-logger-rs --ignore-not-found
kubectl apply -f dotnet-logger-rs.yaml

kubectl delete service dotnet-logger --ignore-not-found
kubectl apply -f dotnet-logger-sc.yaml

cd ..

echo "------------------------------------------------------7. bookstack database"


cd k8s/

kubectl delete rs mysql-bookstack-rs --ignore-not-found
kubectl apply -f bookstack-mysql-rs.yaml
kubectl delete service mysql-bookstack --ignore-not-found
kubectl apply -f bookstack-mysql-sc.yaml

sleep 60

cat sql/bookstack.sql | kubectl exec -i $(kubectl get pod -l app=mysql-bookstack -o name | head -n 1) -- \
mysql -uroot -pbookstack bookstack

cd ..

echo "------------------------------------------------------8. kafka server"

kubectl delete pod kafka --ignore-not-found
kubectl delete svc kafka --ignore-not-found

kubectl expose pod kafka \
    --name=kafka \
    --port=9092 \
    --target-port=9092 \
    --type=ClusterIP

kubectl run kafka \
  --image=apache/kafka:4.1.1 \
  --restart=Never \
  --port=9092 \
  --env="KAFKA_PROCESS_ROLES=broker,controller" \
  --env="KAFKA_NODE_ID=1" \
  --env="KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093" \
  --env="KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092" \
  --env="KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER" \
  --env="KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT" \
  --env="KAFKA_CONTROLLER_QUORUM_VOTERS=1@kafka:9093" \
  --env="KAFKA_CLUSTER_ID=5L6g3nShT-eMCtK--X86sw"

  

echo "------------------------------------------------------9. messaging service"


cd server/messaging

mvn clean package -DskipTests

docker build -t messaging-service:latest .

cd ../../k8s/

kubectl delete replicaset messaging-service-rs --ignore-not-found
kubectl apply -f messaging-server-rs.yaml

kubectl delete service messaging-service --ignore-not-found
kubectl apply -f messaging-server-sc.yaml

cd ..


echo "------------------------------------------------------10. bookstack server"


cd server/bookstack

mvn clean package -DskipTests

docker build -t bookstack-server:latest .

cd ../../k8s/

kubectl delete replicaset bookstack-server-rs --ignore-not-found
kubectl apply -f bookstack-server-rs.yaml

kubectl delete service bookstack-server --ignore-not-found
kubectl apply -f bookstack-server-sc.yaml

cd ..


echo "------------------------------------------------------11. client react"

cd client

npm run build

docker build -t react-client:latest .

cd ../k8s

kubectl delete rs react-client --ignore-not-found
kubectl delete svc react-client --ignore-not-found

kubectl apply -f client-rs.yaml
kubectl apply -f client-sc.yaml

cd ..