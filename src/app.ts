import cors from 'cors';
// @ts-ignore
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import routes from './routes/v1';
// @ts-ignore
import httpStatus from 'http-status';
import config from './config/config';
import compression from 'compression';
import ApiError from './utils/ApiError';
import jwtStrategy  from './config/passport';
import  authLimiter  from './middlewares/rateLimiter';
import { errorConverter, errorHandler } from './middlewares/error';
import {successHandler, errorHandler as morganErrorHandler } from './config/morgan';

const app = express();


app.get('/favicon.ico', (req, res) => res.status(204));

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


export default app;
