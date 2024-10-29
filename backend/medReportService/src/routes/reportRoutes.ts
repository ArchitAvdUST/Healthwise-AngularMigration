import { Router } from "express";
import {
  createReport,
  deleteReport,
  getAReport,
  getAllReports,
  updateReport
} from "../controller/reportController"; // Adjust the import path as necessary

const router = Router();

// Route to create a new report
router.post('/reports', createReport);

// Route to get all reports
router.get('/reports', getAllReports);

// Route to get a specific report by ID
router.get('/reports/:reportId', getAReport as any);

// Route to update an existing report by ID
router.put('/reports/:reportId', updateReport as any);

// Route to delete a report by ID
router.delete('/reports/:reportId', deleteReport as any);

export default router;
