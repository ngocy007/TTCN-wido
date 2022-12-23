const RedisPub = (name, value) => {
    return REDIS.publish(name, value, (err, result) => {
      if (err) {
        err;
      }
      result;
    });
  };

module.exports = {RedisPub}