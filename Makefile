default: setup app

app:
	@docker-compose up -d app

test: 
	@docker-compose up app-test

test-integration:
	@docker-compose up app-test-integration

test-e2e:
	@docker-compose up app-test-e2e

test-unit:
	@docker-compose up app-test-unit

setup: migrate

database:
	@docker-compose up -d database

lint: app
	@docker-compose up app-lint

migrate: database
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate --config src/config/database.js --migrations-path src/database/migrations/" app

migrate-undo:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate:undo --config src/config/database.js --migrations-path src/database/migrations/" app

migrate-undo-all:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate:undo:all --config src/config/database.js --migrations-path src/database/migrations/" app

down:
	@docker-compose down
