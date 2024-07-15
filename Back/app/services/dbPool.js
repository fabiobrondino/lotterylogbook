// Importing the Pool class from the pg module, which is used to interact with PostgreSQL
const { Pool } = require("pg");
const pool = new Pool();

pool.connect().then((r) => console.log("Connected to PostgreSQL database"));

module.exports = pool;
