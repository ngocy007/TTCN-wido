const IOREDIS = require("ioredis");

const REDIS = "";
// const REDIS = new IOREDIS({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
//   user: process.env.REDIS_USER,
// });

// REDIS.on("connect", () => {
//   // console.log("----------", process.env);
//   console.log("Client connected to redis Push...");
// });
// REDIS.on("ready", () => {
//   console.log("Client connected to redis push and ready to use...");
// });
// REDIS.on("error", (error) => {
//   console.log("fail");
// });
// REDIS.on("end", () => {
//   console.log("Client disconnected from redis push");
// });
// REDIS.on("SIGINT", () => {
//   REDIS.quit();
// });

module.exports = REDIS;
