up:
	docker compose up --build -d
auth:
	docker compose -f docker-compose.auth.yaml up --watch

dev:
	docker compose up --watch

down:
	docker compose down

logs:
	docker compose logs -f

auth-logs:
	docker compose logs -f auth-service

db-logs:
	docker compose logs -f auth-db

restart:
	docker compose restart
auth-db:
	docker exec -it delej-auth-db-1  psql -U delej -d auth