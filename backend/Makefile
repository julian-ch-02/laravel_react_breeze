build:
	cd container && docker compose build

setup:
	docker volume create --name=api-mysql-data
	cd container && docker compose -p api-container up -d

destroy:
	cd container && docker compose -p api-container down

create-db:
	docker exec -i api-db sh -c "MYSQL_PWD=root exec mysql -u root" < container/mysql/database.sql

init:
	docker exec -ti php-api make _init

_init:
	composer install
	cp .env.example .env
	php artisan key:generate
	php artisan migrate
	php artisan db:seed
