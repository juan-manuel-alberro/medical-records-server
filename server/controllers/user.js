import User from '../models/user';
import Promise from 'bluebird';
import tokenModule from 'random-token';
import APIError from '../helpers/APIError';
import httpStatus from 'http-status';
import _ from 'lodash';
import config from '../../config/env';

const randomToken = tokenModule.create(config.salt);
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id).then((user) => {
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  })
    .error((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    pass: req.body.pass,
    token: req.body.token,
    expires: req.body.expires
  });

  user.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.pass - The pass of user.
 * @property {string} req.body.token - The token of user.
 * @property {string} req.body.expires - The expires of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.pass = req.body.pass;
  user.token = req.body.token;
  user.expires = req.body.expires;

  user.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;

  User.list({
    limit,
    skip
  })
    .then((users) => res.json(users))
    .error((e) => next(e));
}

/**
 * Generates a randome token
 *
 * @param  {object}   user The user from mongoose
 * @param  {Function} next callback function
 * @return {Promise}
 */
function generateToken(user, next) {
  _.assign(user, {
    token: randomToken(32),
    expires: new Date().getTime() + 86400000
  });

  user.saveAsync()
    .error((e) => next(e));
}

function isValidToken(user) {
  const now = new Date().getTime();
  return now < (user.expires || 0);
}

function findToken(req, res, next, token) {
  return new Promise((resolve, reject) => {
    User.findToken(token)
      .then((user) => {
        if (isValidToken(user)) {
          resolve();
        } else {
          const err = new APIError('The token has expired', httpStatus.UNAUTHORIZED);
          reject(err);
        }
      })
      .error((e) => next(e));
  });
}

function login(req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;

  User.login(username, pass)
    .then((user) => {
      generateToken(user, next);
      res.json(user);
    })
    .error((e) => next(e));
}


/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.removeAsync()
    .then((deletedUser) => res.json(deletedUser))
    .error((e) => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
  login,
  findToken
};
