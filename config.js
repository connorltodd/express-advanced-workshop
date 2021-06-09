const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123!",
  database: "express_advanced_workshop",
});

module.exports = connection;
