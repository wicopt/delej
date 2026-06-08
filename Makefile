up:
	docker compose -f docker-compose.user.yaml up --watch

user:
	docker compose -f docker-compose.user.yaml up --watch

auth:
	docker compose -f docker-compose.user.yaml up --watch

dev:
	docker compose up --watch

down:
	docker compose -f docker-compose.user.yaml down

re:
	docker compose -f docker-compose.user.yaml restart user-service auth-service kong

db:
	docker exec -it delej-delej-db-1 psql -U delej -d user-db

java:
	mvn clean package -DskipTests

java-recompile:
	mvn clean compile

jar:
	java -jar target/event-service-0.0.1-SNAPSHOT.jar