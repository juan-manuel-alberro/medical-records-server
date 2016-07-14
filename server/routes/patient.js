import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import patientCtrl from '../controllers/patient';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/patients - Get list of patients */
  .get(patientCtrl.list)

/** POST /api/patients - Create new patient */
.post(validate(paramValidation.Patients.create), patientCtrl.create);

router.route('/:patientId')
  /** GET /api/patients/:patientId - Get patient */
  .get(patientCtrl.get)

/** PUT /api/patients/:patientId - Update patient */
.put(validate(paramValidation.Patients.update), patientCtrl.update)

/** DELETE /api/patients/:patientId - Delete patient */
.delete(patientCtrl.remove);

/** Load patient when API with patientId route parameter is hit */
router.param('patientId', patientCtrl.load);

export default router;
