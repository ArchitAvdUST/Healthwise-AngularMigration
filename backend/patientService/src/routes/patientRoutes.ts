import { Router } from 'express';
import {
  createPatient,
  deletePatient,
  getAPatient,
  getAllPatients,
  updatePatient,
  searchPatientsByName,
  getPatientsByAgeRange,
  getPatientCount,
  getPatientsBySex,
  getMedicalHistory
} from '../controller/patientController'; // Adjust the path as necessary

const router = Router();

// Create a new patient
router.post('/patients', createPatient);

// Get all patients
router.get('/patients', getAllPatients);

// Get a specific patient by ID
router.get('/patients/:username', getAPatient);

// Update a patient
router.put('/patients/:username', updatePatient); // Added patientId to the URL for specific updates

// Delete a specific patient by ID
router.delete('/patients/:username', deletePatient);

// Search patients by name
router.get('/patients/search', searchPatientsByName as any);

// Get patients by age range
router.get('/patients/age', getPatientsByAgeRange);

// Get the total count of patients
router.get('/patients/count', getPatientCount);

// Get patients by sex
router.get('/patients/sex/:sex', getPatientsBySex);

// Get medical history for a specific patient
router.get('/patients/:username/medical-history', getMedicalHistory);

export default router;
