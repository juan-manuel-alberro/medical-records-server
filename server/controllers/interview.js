import Interview from '../models/interview';

/**
 * Load interview and append to req.
 */
function load(req, res, next, id) {
  Interview.get(id).then((interview) => {
    req.interview = interview; // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get interview
 * @returns {Interview}
 */
function get(req, res) {
  return res.json(req.interview);
}

/**
 * Create new interview
 * @property {date} req.body.date - The date of interview.
 * @property {string} req.body.test - The test of interview.
 * @property {string} req.body.befall - The befall of interview.
 * @property {string} req.body.hypothesis - The hypothesis of interview.
 * @property {string} req.body.visit - The visit of interview.
 * @returns {Interview}
 */
function create(req, res, next) {
  const interview = new Interview({
    date: req.body.date,
    test: req.body.test,
    befall: req.body.befall,
    hypothesis: req.body.hypothesis,
    visit: req.body.visit
  });

  interview.saveAsync()
    .then((savedInterview) => res.json(savedInterview))
    .error((e) => next(e));
}

/**
 * Update existing interview
 * @property {date} req.body.date - The date of interview.
 * @property {string} req.body.test - The test of interview.
 * @property {string} req.body.befall - The befall of interview.
 * @property {string} req.body.hypothesis - The hypothesis of interview.
 * @property {string} req.body.visit - The visit of interview.
 * @returns {Interview}
 */
function update(req, res, next) {
  const interview = req.interview;

  interview.date = req.body.date;
  interview.test = req.body.test;
  interview.befall = req.body.befall;
  interview.hypothesis = req.body.hypothesis;
  interview.visit = req.body.visit;

  interview.saveAsync()
    .then((savedInterview) => res.json(savedInterview))
    .error((e) => next(e));
}

/**
 * Get interview list.
 * @property {number} req.query.skip - Number of interviews to be skipped.
 * @property {number} req.query.limit - Limit number of interviews to be returned.
 * @returns {Interview[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;

  Interview.list({
    limit,
    skip
  })
  .then((interviews) => res.json(interviews))
  .error((e) => next(e));
}

/**
 * Delete interview.
 * @returns {Interview}
 */
function remove(req, res, next) {
  const interview = req.interview;
  interview.removeAsync()
    .then((deletedInterview) => res.json(deletedInterview))
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
