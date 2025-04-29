FROM openjdk:17
ARG JAR_FILE=target/backendMono.jar
COPY ${JAR_FILE} backendMono.jar
EXPOSE 8090
ENTRYPOINT ["java","-jar","/backendMono.jar"]