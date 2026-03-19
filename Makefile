up:
	docker compose up --build -d

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