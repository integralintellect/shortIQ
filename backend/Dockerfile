# use a maven image with java 24 to build the spring boot map
FROM eclipse-temurin:24-jdk AS build

# set the working director
WORKDIR /app

# copy the mavel wrapper and pom.xml
COPY mvnw ./
COPY .mvn/ .mvn/

# ensure the maven wrapper is executable
RUN chmod +x mvnw

COPY pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:24-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]