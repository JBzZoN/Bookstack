# #!/bin/bash

# echo "------------------------------------------------------1. Gateway"

# cd server/gateway/

# "C:\Program Files\Apache\maven\bin\mvn.cmd" clean package

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t api-gateway:latest .

# cd ../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset api-gateway-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f api-gateway-rs.yaml
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service api-gateway --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f api-gateway-sc.yaml

# cd ..

# echo "------------------------------------------------------2. Express server"

# cd server/book-service

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t express-service:latest .


# cd ../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset express-service-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f book-service-rs.yaml

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service express-service --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f book-service-sc.yaml

# cd ..

# echo "------------------------------------------------------4. book_db database"

# cd k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete rs mysql-book-db-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f book-db-mysql-rs.yaml
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service mysql-book-db --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f book-db-mysql-sc.yaml

# "C:\Program Files\Git\usr\bin\sleep.exe" 60

# "C:\Program Files\Git\usr\bin\cat.exe" sql/book_db.sql | "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" exec -i $("C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" get pod -l app=mysql-book-db -o name | "C:\Program Files\Git\usr\bin\head.exe" -n 1) -- \
# mysql -uroot -pbookstack book_db

# cd ..

# echo "------------------------------------------------------5. authorization database"

# cd k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete rs mysql-authorization-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f authorization-mysql-rs.yaml
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service mysql-authorization --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f authorization-mysql-sc.yaml

# "C:\Program Files\Git\usr\bin\sleep.exe" 60

# "C:\Program Files\Git\usr\bin\cat.exe" sql/authorization.sql | "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" exec -i $("C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" get pod -l app=mysql-authorization -o name | "C:\Program Files\Git\usr\bin\head.exe" -n 1) -- \
# mysql -uroot -pbookstack authorization

# cd ..


# echo "------------------------------------------------------3. Authorization server"

# cd server/auth-server

# "C:\Program Files\Apache\maven\bin\mvn.cmd" clean package -DskipTests

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t auth-server:latest .

# cd ../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset auth-server-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f auth-server-rs.yaml

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service auth-server --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f auth-server-sc.yaml

# cd ..

# echo "------------------------------------------------------6. logger server"

# cd server/logger/WebApplication1/

# "C:\Program Files\dotnet\dotnet.exe" clean && "C:\Program Files\dotnet\dotnet.exe" publish -c Release -o out

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t dotnet-logger:latest .

# cd ../../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset dotnet-logger-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f dotnet-logger-rs.yaml

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service dotnet-logger --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f dotnet-logger-sc.yaml

# cd ..

# echo "------------------------------------------------------7. bookstack database"


# cd k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete rs mysql-bookstack-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f bookstack-mysql-rs.yaml
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service mysql-bookstack --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f bookstack-mysql-sc.yaml

# "C:\Program Files\Git\usr\bin\sleep.exe" 60

# "C:\Program Files\Git\usr\bin\cat.exe" sql/bookstack.sql | "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" exec -i $("C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" get pod -l app=mysql-bookstack -o name | "C:\Program Files\Git\usr\bin\head.exe" -n 1) -- \
# mysql -uroot -pbookstack bookstack

# cd ..

# echo "------------------------------------------------------8. kafka server"

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete pod kafka --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete svc kafka --ignore-not-found

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" run kafka \
#   --image=apache/kafka:4.1.1 \
#   --restart=Never \
#   --port=9092 \
#   --env="KAFKA_PROCESS_ROLES=broker,controller" \
#   --env="KAFKA_NODE_ID=1" \
#   --env="KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093" \
#   --env="KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092" \
#   --env="KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER" \
#   --env="KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT" \
#   --env="KAFKA_CONTROLLER_QUORUM_VOTERS=1@kafka:9093" \
#   --env="KAFKA_CLUSTER_ID=5L6g3nShT-eMCtK--X86sw"


# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" expose pod kafka \
#     --name=kafka \
#     --port=9092 \
#     --target-port=9092 \
#     --type=ClusterIP

  

# echo "------------------------------------------------------9. messaging service"


# cd server/messaging

# "C:\Program Files\Apache\maven\bin\mvn.cmd" clean package -DskipTests

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t messaging-service:latest .

# cd ../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset messaging-service-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f messaging-server-rs.yaml

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service messaging-service --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f messaging-server-sc.yaml

# cd ..


# echo "------------------------------------------------------10. bookstack server"


# cd server/bookstack

# "C:\Program Files\Apache\maven\bin\mvn.cmd" clean package -DskipTests

# "C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t bookstack-server:latest .

# cd ../../k8s/

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete replicaset bookstack-server-rs --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f bookstack-server-rs.yaml

# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete service bookstack-server --ignore-not-found
# "C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f bookstack-server-sc.yaml

# cd ..


echo "------------------------------------------------------11. client react"

cd client

"C:\Program Files\nodejs\npm.cmd" install -D vite

"C:\Program Files\nodejs\npm.cmd" run build

"C:\Program Files\Docker\Docker\resources\bin\docker.exe" build -t react-client:latest .

cd ../k8s

"C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete rs react-client --ignore-not-found
"C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" delete svc react-client --ignore-not-found

"C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f client-rs.yaml
"C:\Program Files\Docker\Docker\resources\bin\kubectl.exe" apply -f client-sc.yaml

cd ..