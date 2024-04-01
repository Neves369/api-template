import winston from 'winston'
import config from './config'

// Função de formatação personalizada para adicionar o rastro de pilha de erro ao logger
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    info.message = info.stack
  }
  return info
})

// Configura o logger com níveis diferentes e formatação
const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
})


export default logger