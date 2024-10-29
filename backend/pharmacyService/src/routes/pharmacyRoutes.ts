import { Router } from 'express';
import {
  createPharmacy,
  deletePharmacy,
  getAllPharmacies,
  getPharmacyById,
  updatePharmacy
} from '../controller/pharmacyController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new pharmacy record
router.post('/pharmacies', createPharmacy);

// Route to get all pharmacy records
router.get('/pharmacies', getAllPharmacies);

// Route to get a pharmacy record by ID
router.get('/pharmacies/:pharmacyId', getPharmacyById as any);

// Route to update a pharmacy record by ID
router.put('/pharmacies/:pharmacyId', updatePharmacy as any);

// Route to delete a pharmacy record by ID
router.delete('/pharmacies/:pharmacyId', deletePharmacy as any);

export default router;
