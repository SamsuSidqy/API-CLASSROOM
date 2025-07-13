import winston from 'winston'


const logging = winston.createLogger({
  level: 'info',
  format:winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
  transports: [
    // Log to file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log' }),

    // Optional: also log to console
    new winston.transports.Console({
      format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      )
    })
  ]
});
export default logging
