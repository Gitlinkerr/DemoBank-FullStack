FROM openjdk:17-jdk-alpine
RUN mkdir -p /app/uploads
ADD target/demobank_v2-0.0.1-SNAPSHOT.jar demobank_v2-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "demobank_v2-0.0.1-SNAPSHOT.jar"]