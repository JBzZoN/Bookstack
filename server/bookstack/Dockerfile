# Java 21 runtime (JRE only)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY target/*.jar app.jar

# Expose application port (adjust if needed)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
