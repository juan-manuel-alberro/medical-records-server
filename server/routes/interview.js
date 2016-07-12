import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import interviewCtrl from '../controllers/interview';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/interviews - Get list of interviews */
  .get(interviewCtrl.list)

/** POST /api/interviews - Create new interview */
.post(validate(paramValidation.Interviews.create), interviewCtrl.create);

router.route('/:interviewId')
  /** GET /api/interviews/:interviewId - Get interview */
  .get(interviewCtrl.get)

/** PUT /api/interviews/:interviewId - Update interview */
.put(validate(paramValidation.Interviews.update), interviewCtrl.update)

/** DELETE /api/interviews/:interviewId - Delete interview */
.delete(interviewCtrl.remove);

/** Load interview when API with interviewId route parameter is hit */
router.param('interviewId', interviewCtrl.load);

export default router;
