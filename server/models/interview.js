import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Interview Schema
 */
const InterviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  test: {
    type: String,
    required: true
  },
  befall: {
    type: String,
    required: true
  },
  hypothesis: {
    type: String,
    required: true
  },
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit'
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
InterviewSchema.method({});

/**
 * Statics
 */
InterviewSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((interview) => {
        if (interview) {
          return interview;
        }
        const err = new APIError('No such interview exists!', httpStatus.NOT_FOUND);
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
 * @typedef Interview
 */
export default mongoose.model('Interview', InterviewSchema);
