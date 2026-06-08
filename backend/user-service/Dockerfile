# Первый этап: сборка
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /build

# Копируем только файлы, описывающие зависимости
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .


RUN ./mvnw dependency:go-offline

# Теперь копируем исходники
COPY src src

# Собираем JAR
RUN ./mvnw clean package -DskipTests

# Второй этап: готовый JAR
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]