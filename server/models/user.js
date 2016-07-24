import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: false
  },
  token: {
    type: String,
    required: false
  },
  expires: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  findToken(token) {
    return this.findOne({
      token
    })
    .execAsync()
    .then((validToken) => {
      if (validToken) {
        return Promise.resolve(validToken);
      }
      const err = new APIError('The token is not longer valid', httpStatus.UNAUTHORIZED);
      return Promise.reject(err);
    });
  },

  /**
   * Validate if the user and pass are valids.
   *
   * @param  {string} username The user name
   * @param  {string} pass     The pass
   * @return {object}          The entire user or an error
   */
  login(username, pass) {
    return this.findOne({
      username,
      pass
    })
    .execAsync().then((user) => {
      if (user) {
        return user;
      }
      const err = new APIError('The username/pass combination is incorrect',
        httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
