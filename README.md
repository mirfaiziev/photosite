docker-compose build
docker-compose run --rm -e COMPOSER_MEMORY_LIMIT=-1 phpfpm composer install
docker-compose run --rm nodejs yarn install
docker-compose up