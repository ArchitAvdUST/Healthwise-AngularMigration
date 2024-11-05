import { Router } from 'express';
import {
  createBilling,
  deleteBilling,
  getAllBillings,
  getBillingById,
  updateBilling,
  getBillingByAppointmentId
} from '../controller/billingController'; // Adjust the import path as necessary

const router = Router();

// Route to create a new billing record
router.post('/billings', createBilling);

// Route to get all billing records
router.get('/billings', getAllBillings);

// Route to get a billing record by ID
router.get('/billings/:billingId', getBillingById as any);

// Route to update a billing record by ID
router.put('/billings/:billingId', updateBilling as any);

// Route to delete a billing record by ID
router.delete('/billings/:billingId', deleteBilling as any);

router.get('/billings/appointment/:appointmentId', getBillingByAppointmentId as any);

export default router;
