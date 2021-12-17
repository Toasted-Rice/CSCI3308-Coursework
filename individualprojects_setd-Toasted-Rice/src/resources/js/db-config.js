const is_production = process.env.NODE_ENV === "production";
const { Pool } = require('pg');
const { parse } = require("pg-connection-string");
const connection_string = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const db_config = parse(is_production ? process.env.DATABASE_URL : connection_string)
if (is_production) db_config.ssl = {rejectUnauthorized: false};
const postgres = new Pool(db_config);
postgres.connect();
module.exports = postgres;