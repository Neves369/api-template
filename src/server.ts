import "reflect-metadata";
import { Server, IncomingMessage, ServerResponse } from 'http';
import app from './app';
import config from './config/config';
import logger from './config/logger';

let server: any; 

  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});