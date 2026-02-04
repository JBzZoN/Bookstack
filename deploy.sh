#!/bin/bash

echo "------------------------------------------------------1. Gateway"

cd server/gateway/

mvn clean package

docker build -t api-gateway:latest .

cd ../../k8s/

kubectl delete replicaset api-gateway-rs
kubectl apply -f api-gateway-rs.yaml
kubectl delete service api-gateway
kubectl apply -f api-gateway-sc.yaml

cd ..

echo "------------------------------------------------------2. Express server"

cd server/book-service

docker build -t express-service:latest .

cd ../../k8s/

kubectl delete replicaset express-service-rs
kubectl apply -f book-service-rs.yaml

kubectl delete service express-service
kubectl apply -f book-service-sc.yaml

cd ..

echo "------------------------------------------------------3. Authorization server"

cd server/auth-server

mvn clean package

docker build -t auth-server:latest .

cd ../../k8s/

kubectl delete replicaset auth-server-rs
kubectl apply -f auth-server-rs.yaml

kubectl delete service auth-server
kubectl apply -f auth-server-sc.yaml

cd ..

echo "------------------------------------------------------4. book_db database"

cd k8s/

kubectl delete rs mysql-book-db-rs
kubectl apply -f book-db-mysql-rs.yaml
kubectl delete service mysql-book-db
kubectl apply -f book-db-mysql-sc.yaml

sleep 60

cat sql/book_db.sql | kubectl exec -i $(kubectl get pod -l app=mysql-book-db -o name | head -n 1) -- \
mysql -uroot -pbookstack book_db

cd ..

echo "------------------------------------------------------5. authorization database"

cd k8s/

kubectl delete rs mysql-authorization-rs
kubectl apply -f authorization-mysql-rs.yaml
kubectl delete service mysql-authorization
kubectl apply -f authorization-mysql-sc.yaml

sleep 60

cat sql/authorization.sql | kubectl exec -i $(kubectl get pod -l app=mysql-authorization -o name | head -n 1) -- \
mysql -uroot -pbookstack authorization

cd ..

echo "------------------------------------------------------6. logger server"

cd server/logger/WebApplication1/

dotnet clean && dotnet publish -c Release -o out

docker build -t dotnet-logger:latest .

cd ../../../k8s/

kubectl delete replicaset dotnet-logger-rs
kubectl apply -f dotnet-logger-rs.yaml

kubectl delete service dotnet-logger
kubectl apply -f dotnet-logger-sc.yaml

cd ..

echo "------------------------------------------------------7. bookstack database"


cd k8s/

kubectl delete rs mysql-bookstack-rs
kubectl apply -f bookstack-mysql-rs.yaml
kubectl delete service mysql-bookstack
kubectl apply -f bookstack-mysql-sc.yaml

sleep 60

cat sql/bookstack.sql | kubectl exec -i $(kubectl get pod -l app=mysql-bookstack -o name | head -n 1) -- \
mysql -uroot -pbookstack bookstack

cd ..

echo "------------------------------------------------------8. kafka server"

cd k8s/

# NO IDEA

cd ..

echo "------------------------------------------------------9. messaging service"


cd server/messaging

mvn clean package -DskipTests

docker build -t messaging-service:latest .

cd ../../k8s/

kubectl delete replicaset messaging-service-rs
kubectl apply -f messaging-server-rs.yaml

kubectl delete service messaging-service
kubectl apply -f messaging-server-sc.yaml

cd ..


echo "------------------------------------------------------10. bookstack server"


cd server/bookstack

mvn clean package -DskipTests

docker build -t bookstack-server:latest .

cd ../../k8s/

kubectl delete replicaset bookstack-server-rs
kubectl apply -f bookstack-server-rs.yaml

kubectl delete service bookstack-server
kubectl apply -f bookstack-server-sc.yaml

cd ..
