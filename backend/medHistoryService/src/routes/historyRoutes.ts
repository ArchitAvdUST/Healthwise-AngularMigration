import { Router } from 'express';
import {
  getHistoryByPatientId,
  addHistoryForPatient
} from '../controller/historyController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new history entry
router.post('/histories/add/:patientId', addHistoryForPatient as any);

// Route to get histories by patient ID
router.get('/histories/:patientId', getHistoryByPatientId as any);

export default router;
