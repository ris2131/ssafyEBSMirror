FROM openjdk:8-jdk

RUN mkdir -p /pic
RUN mkdir -p /pic/hairshop
RUN mkdir -p /pic/designer

ARG JAR_FILE=build/libs/business-be-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
