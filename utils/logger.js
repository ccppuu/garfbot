const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      prettyPrint: true,
      colorize: true,
    })
  ]
});

module.exports = logger;