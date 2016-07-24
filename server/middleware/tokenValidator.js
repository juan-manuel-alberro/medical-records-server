import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../controllers/user';
import config from '../../config/env';

export default (req, res, next) => {
  const authToken = req.get('X-auth');
  const reqUrl = req.originalUrl;

  // disable token validation for certain urls
  if (config.unsecureUrls === '*' || (config.unsecureUrls.includes(reqUrl))) {
    next();
    return;
  }

  if (!authToken) {
    const error = new APIError('Invalid token, ending request', httpStatus.UNAUTHORIZED, false);
    next(error);
  }

  User.findToken(req, res, next, authToken)
    .then(() => next())
    .catch((e) => {
      next(e);
    });
};
