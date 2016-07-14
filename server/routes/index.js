import express from 'express';
import userRoutes from './user';
import interviewRoutes from './interview';
import visitRoutes from './visit';
import patientRoutes from './patient';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/interviews', interviewRoutes);
router.use('/visits', visitRoutes);
router.use('/patients', patientRoutes);

export default router;
