const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'jj1993*54321edit!',
  database: 'employee_tracker'
});

module.exports = db;
