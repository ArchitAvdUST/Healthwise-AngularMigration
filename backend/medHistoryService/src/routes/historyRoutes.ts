import { Router } from 'express';
import {
  addHistory,
  deleteHistory,
  getAllHistories,
  getHistoryByPatientId,
  updateHistory
} from '../controller/historyController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new history entry
router.post('/histories', addHistory);

// Route to get all histories
router.get('/histories', getAllHistories);

// Route to get histories by patient ID
router.get('/histories/:patientId', getHistoryByPatientId);

// Route to update a history entry by patient ID
router.put('/histories/:patientId', updateHistory as any);

// Route to delete a history entry by patient ID
router.delete('/histories/:patientId', deleteHistory as any);

export default router;
