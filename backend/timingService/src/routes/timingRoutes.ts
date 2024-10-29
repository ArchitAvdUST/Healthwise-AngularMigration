import { Router } from 'express';
import {
  createTiming,
  deleteTiming,
  getAllTimings,
  getTimingById,
  updateTiming,
  getTimingsByDoctorId
} from '../controller/timingController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new timing record
router.post('/timings', createTiming);

// Route to get all timing records
router.get('/timings', getAllTimings);

// Route to get a timing record by ID
router.get('/timings/:timingId', getTimingById as any);

// Route to get timings by doctorId
router.get('/timings/doctor/:doctorId', getTimingsByDoctorId as any);

// Route to update a timing record by ID
router.put('/timings/:timingId', updateTiming as any);

// Route to delete a timing record by ID
router.delete('/timings/:timingId', deleteTiming as any);

export default router;
