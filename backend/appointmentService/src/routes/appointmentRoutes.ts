import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentsByDate,
  getAppointmentsByDoctorAndDate,
  //getAppointmentsByDoctorUsername,
  //getAppointmentsByPatientUsername,
  updateAppointment,
} from "../controller/appointmentController"; // Adjust the import path as necessary

const router = Router();

// Create a new appointment
router.post('/appointments', createAppointment);

// Retrieve all appointments
router.get('/appointments', getAllAppointments);

// Retrieve all appointments for a particular date
router.get('/appointments/:date', getAppointmentsByDate);

// Retrieve all appointments for a particular doctor on a particular date
router.get('/appointments/doctor/:date', getAppointmentsByDoctorAndDate);

// Retrieve all appointments for a particular doctor by username
//router.get('/appointments/doctor/username/:username', getAppointmentsByDoctorUsername);

// Retrieve all appointments for a particular patient by username
//router.get('/appointments/patient/username/:username', getAppointmentsByPatientUsername);

// Update an existing appointment
router.put('/appointments/:appointmentId', updateAppointment as any);

// Delete an appointment
router.delete('/appointments/:appointmentId', deleteAppointment as any );

export default router;
