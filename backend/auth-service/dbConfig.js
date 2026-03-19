require("dotenv").config();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Ошибка подключения к БД:', err);
  }
  console.log('Подключение к БД успешно');
  release();
});
module.exports = { pool };