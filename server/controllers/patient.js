import Patient from '../models/patient';

/**
 * Load patient and append to req.
 */
function load(req, res, next, id) {
  Patient.get(id).then((patient) => {
    req.patient = patient; // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get patient
 * @returns {Patient}
 */
function get(req, res) {
  return res.json(req.patient);
}

/**
 * Create new patient
 * @property {string} req.body.name - The name of patient.
 * @property {string} req.body.lastname - The lastname of patient.
 * @property {date} req.body.dob - The day of birthday of patient.
 * @property {string} req.body.education - The education of patient.
 * @property {string} req.body.phoneNumber - The phone number of patient.
 * @property {string} req.body.mobileNumber - The mobile number of patient.
 * @property {string} req.body.referer - The referer of patient.
 * @property {string} req.body.familyTree - The family tree of patient.
 * @returns {Patient}
 */
function create(req, res, next) {
  const patient = new Patient({
    name: req.body.name,
    lastname: req.body.lastname,
    dob: req.body.dob,
    education: req.body.education,
    phoneNumber: req.body.phoneNumber,
    mobileNumber: req.body.mobileNumber,
    referer: req.body.referer,
    familyTree: req.body.familyTree
  });

  patient.saveAsync()
    .then((savedPatient) => res.json(savedPatient))
    .error((e) => next(e));
}

/**
 * Update existing patient
 * @property {string} req.body.name - The name of patient.
 * @property {string} req.body.lastname - The lastname of patient.
 * @property {date} req.body.dob - The day of birthday of patient.
 * @property {string} req.body.education - The education of patient.
 * @property {string} req.body.phoneNumber - The phone number of patient.
 * @property {string} req.body.mobileNumber - The mobile number of patient.
 * @property {string} req.body.referer - The referer of patient.
 * @property {string} req.body.familyTree - The family tree of patient.
 * @returns {Patient}
 */
function update(req, res, next) {
  const patient = req.patient;

  patient.name = req.body.name;
  patient.lastname = req.body.lastname;
  patient.dob = req.body.dob;
  patient.education = req.body.education;
  patient.phoneNumber = req.body.phoneNumber;
  patient.mobileNumber = req.body.mobileNumber;
  patient.referer = req.body.referer;
  patient.familyTree = req.body.familyTre;

  patient.saveAsync()
    .then((savedPatient) => res.json(savedPatient))
    .error((e) => next(e));
}

/**
 * Get patient list.
 * @property {number} req.query.skip - Number of patients to be skipped.
 * @property {number} req.query.limit - Limit number of patients to be returned.
 * @returns {Patient[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;

  Patient.list({
    limit,
    skip
  })
  .then((patients) => res.json(patients))
  .error((e) => next(e));
}

/**
 * Delete patient.
 * @returns {Patient}
 */
function remove(req, res, next) {
  const patient = req.patient;
  patient.removeAsync()
    .then((deletedPatient) => res.json(deletedPatient))
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
