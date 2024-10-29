import { Router } from 'express';
import {
  createAdmin,
  updateAdmin,
  deleteAdmin
} from '../controller/adminController'; // Adjust the path as necessary

const router = Router();

// Admin routes
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin as any);
router.delete('/admins/:id', deleteAdmin as any);

export default router;
