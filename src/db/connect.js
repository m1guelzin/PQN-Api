const mysql = require("mysql2/promise");
require("dotenv").config();

// Cria o pool de conexões com as variáveis do .env
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = pool;
