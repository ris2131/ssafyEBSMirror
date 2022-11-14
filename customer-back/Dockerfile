FROM openjdk:8-jdk

RUN mkdir /pic

ARG JAR_FILE=build/libs/customer-back-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
