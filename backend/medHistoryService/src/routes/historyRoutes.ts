import { Router } from 'express';
import {
  createHistory,
  deleteHistory,
  getAllHistories,
  getHistoriesByPatientId,
  updateHistory
} from '../controller/historyController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new history entry
router.post('/histories', createHistory);

// Route to get all histories
router.get('/histories', getAllHistories);

// Route to get histories by patient ID
router.get('/histories/:patientId', getHistoriesByPatientId);

// Route to update a history entry by patient ID
router.put('/histories/:patientId', updateHistory as any);

// Route to delete a history entry by patient ID
router.delete('/histories/:patientId', deleteHistory as any);

export default router;
