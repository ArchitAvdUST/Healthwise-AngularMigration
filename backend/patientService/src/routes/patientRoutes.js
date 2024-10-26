"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientController_1 = require("../controller/patientController"); // Adjust the path as necessary
const router = (0, express_1.Router)();
// Create a new patient
router.post('/patients', patientController_1.createPatient);
// Get all patients
router.get('/patients', patientController_1.getAllPatients);
// Get a specific patient by ID
router.get('/patients/:patientId', patientController_1.getAPatient);
// Update a patient
router.put('/patients/:patientId', patientController_1.updatePatient); // Added patientId to the URL for specific updates
// Delete a specific patient by ID
router.delete('/patients/:patientId', patientController_1.deletePatient);
// Search patients by name
router.get('/patients/search', patientController_1.searchPatientsByName);
// Get patients by age range
router.get('/patients/age', patientController_1.getPatientsByAgeRange);
// Get the total count of patients
router.get('/patients/count', patientController_1.getPatientCount);
// Get patients by sex
router.get('/patients/sex/:sex', patientController_1.getPatientsBySex);
// Get medical history for a specific patient
router.get('/patients/:patientId/medical-history', patientController_1.getMedicalHistory);
exports.default = router;
