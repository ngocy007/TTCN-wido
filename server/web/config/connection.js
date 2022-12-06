require("dotenv").config();

const Sequelize = require("sequelize");

const db = new Sequelize("socialNetwork", "postgres", "1408", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
