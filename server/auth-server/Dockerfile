# Java 21 runtime (NOT JDK)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY target/*.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "app.jar"]
