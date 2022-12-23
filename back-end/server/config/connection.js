require("dotenv").config();

const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
