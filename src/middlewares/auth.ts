// @ts-nocheck
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { roleRights } from '../config/roles';

/**
 * verifyCallback
 * This function is a callback for passport.authenticate that performs additional checks after authentication.
 * It checks if the user has the required rights for the requested operation.
 *
 * @param {Object} req - The request object.
 * @param {Function} resolve - A function to resolve the promise.
 * @param {Function} reject - A function to reject the promise.
 * @param {Array} requiredRights - An array of rights that the user must have.
 * @returns {Function} - A callback function for passport.authenticate.
 */
const verifyCallback = (req: object, resolve: Function, reject: Function, requiredRights: Array<any>): Function => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every(requiredRight => userRights?.includes(requiredRight));

    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

/**
 * auth
 * This middleware function is used to authenticate the request and check if the user has the required rights.
 * If successful, it passes the user to the next middleware.
 *
 * @param {...any} requiredRights - An array of rights that the user must have.
 * @returns {Function} - A middleware function.
 */
const auth = (...requiredRights: any[]): Function => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;