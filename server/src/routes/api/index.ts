
import { patientRouter } from './patient-routes.js';
import express from 'express';
const router = express.Router();


router.use('/patient', patientRouter)


export default router;
