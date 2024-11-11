// Database connection setup for MongoDB and MySQL
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// MySQL Connection
const mysqlConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

export { mongoose, mysqlConnection };
