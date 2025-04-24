const fs = require("fs");

const logger = (req, res, next) => {
  const log = `URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date()}\n`;
  fs.appendFileSync("log.txt", log);
  next();
}

module.exports =logger;
