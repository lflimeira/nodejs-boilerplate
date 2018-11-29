#!/bin/sh
#run entrypoint for decrypt variables
echo "call entrypoint"
sh -c /entrypoint.sh
#run migrations
echo "call migrations"
/boilerplate/node_modules/.bin/sequelize db:migrate --config /boilerplate/src/config/database.js --migrations-path /boilerplate/src/database/migrations/
#run server
echo "call server service"
node /boilerplate/src/bin/server.js