import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Visit Schema
 */
const VisitSchema = new mongoose.Schema({
  visitReason: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  diagnosisPlan: {
    type: String,
    required: false
  },
  firstSetOfHypothesis: {
    type: String,
    required: false
  },
  referralOrInterclinical: {
    type: String,
    required: false
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  visitStatus: {
    type: Boolean,
    required: false,
    default: true
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
VisitSchema.method({});

/**
 * Statics
 */
VisitSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((patient) => {
        if (patient) {
          return patient;
        }
        const err = new APIError('No such patient exists!', httpStatus.NOT_FOUND);
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
 * @typedef Visit
 */
export default mongoose.model('Visit', VisitSchema);
