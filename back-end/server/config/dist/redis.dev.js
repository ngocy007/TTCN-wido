"use strict";

var IOREDIS = require("ioredis");

var REDIS = new IOREDIS({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  user: process.env.REDIS_USER
});
REDIS.on("connect", function () {
  // console.log("----------", process.env);
  console.log("Client connected to redis Push...");
});
REDIS.on("ready", function () {
  console.log("Client connected to redis push and ready to use...");
});
REDIS.on("error", function (error) {
  console.log("fail");
});
REDIS.on("end", function () {
  console.log("Client disconnected from redis push");
});
REDIS.on("SIGINT", function () {
  REDIS.quit();
});
module.exports = REDIS;