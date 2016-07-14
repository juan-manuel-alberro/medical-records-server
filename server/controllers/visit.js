import Visit from '../models/visit';

/**
 * Load visit and append to req.
 */
function load(req, res, next, id) {
  Visit.get(id).then((visit) => {
    req.visit = visit; // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get visit
 * @returns {Visit}
 */
function get(req, res) {
  return res.json(req.visit);
}

/**
 * Create new visit
 * @property {date} req.body.date - The date of visit.
 * @property {string} req.body.visitReason - The visit reason of visit.
 * @property {string} req.body.diagnosisPlan - The diagnosisPlan of visit.
 * @property {string} req.body.firstSetOfHypothesis -
 *                    The first set of hypothesis of visit.
 * @property {string} req.body.referralOrInterclinical -
 *                    The referral or Interclinical of visit.
 * @property {string} req.body.patient - The patient of visit.
 * @returns {Visit}
 */
function create(req, res, next) {
  const visit = new Visit({
    visitReason: req.body.visitReason,
    date: req.body.date,
    diagnosisPlan: req.body.diagnosisPlan,
    firstSetOfHypothesis: req.body.firstSetOfHypothesis,
    referralOrInterclinical: req.body.referralOrInterclinical,
    patient: req.body.patient
  });

  visit.saveAsync()
    .then((savedVisit) => res.json(savedVisit))
    .error((e) => next(e));
}

/**
 * Update existing visit
* @property {date} req.body.date - The date of visit.
* @property {string} req.body.visitReason - The visit reason of visit.
* @property {string} req.body.diagnosisPlan - The diagnosisPlan of visit.
* @property {string} req.body.firstSetOfHypothesis -
*                    The first set of hypothesis of visit.
* @property {string} req.body.referralOrInterclinical -
*                    The referral or Interclinical of visit.
* @property {string} req.body.patient - The patient of visit.
* @returns {Visit}
*/
function update(req, res, next) {
  const visit = req.visit;

  visit.visitReason = req.body.visitReason;
  visit.date = req.body.date;
  visit.diagnosisPlan = req.body.diagnosisPlan;
  visit.firstSetOfHypothesis = req.body.firstSetOfHypothesis;
  visit.referralOrInterclinical = req.body.referralOrInterclinical;
  visit.patient = req.body.patient;

  visit.saveAsync()
    .then((savedVisit) => res.json(savedVisit))
    .error((e) => next(e));
}

/**
 * Get visit list.
 * @property {number} req.query.skip - Number of visits to be skipped.
 * @property {number} req.query.limit - Limit number of visits to be returned.
 * @returns {Visit[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;

  Visit.list({
    limit,
    skip
  })
  .then((visits) => res.json(visits))
  .error((e) => next(e));
}

/**
 * Delete visit.
 * @returns {Visit}
 */
function remove(req, res, next) {
  const visit = req.visit;
  visit.removeAsync()
    .then((deletedVisit) => res.json(deletedVisit))
    .error((e) => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
