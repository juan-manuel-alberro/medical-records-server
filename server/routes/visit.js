import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import visitCtrl from '../controllers/visit';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/visits - Get list of visits */
  .get(visitCtrl.list)

/** POST /api/visits - Create new visit */
.post(validate(paramValidation.Visits.create), visitCtrl.create);

router.route('/:visitId')
  /** GET /api/visits/:visitId - Get visit */
  .get(visitCtrl.get)

/** PUT /api/visits/:visitId - Update visit */
.put(validate(paramValidation.Visits.update), visitCtrl.update)

/** DELETE /api/visits/:visitId - Delete visit */
.delete(visitCtrl.remove);

/** Load visit when API with visitId route parameter is hit */
router.param('visitId', visitCtrl.load);

export default router;
