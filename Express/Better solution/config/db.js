const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase'
});
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});
module.exports = connection;
