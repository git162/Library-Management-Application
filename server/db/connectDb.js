const { Client } = require("pg");

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect();

module.exports = client;
