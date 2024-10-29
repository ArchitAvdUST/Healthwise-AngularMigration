import { Request, Response } from 'express';
import Appointment from '../entity/appointment'; // Adjust the import path as necessary
import axios from 'axios';

// Base URLs for the services (replace with your actual service URLs)
const DOCTOR_SERVICE_URL = 'http://doctor-service/api/doctors';
const PATIENT_SERVICE_URL = 'http://patient-service/api/patients';

// Retrieve list of all appointments
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error });
  }
};

// Retrieve all appointments for a particular date
export const getAppointmentsByDate = async (req: Request, res: Response) => {
    try {
      const { date } = req.params;
      
      // Assuming the date parameter is in ISO string format
      const appointments = await Appointment.find({ date: date });
      
      res.status(200).json(appointments);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching appointments for date', error });
    }
  };
  

// Retrieve all appointments for a particular doctor on a particular date
export const getAppointmentsByDoctorAndDate = async (req: Request, res: Response) => {
    try {
      const { date } = req.params;
      const { doctorId } = req.query; // doctorId is passed as a query parameter
  
      // Find appointments by date and doctorId
      const appointments = await Appointment.find({ date: date, doctorId: doctorId });
      
      res.status(200).json(appointments);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching appointments for doctor on date', error });
    }
  };
  

// Retrieve all appointments for a particular doctor by username
 /* export const getAppointmentsByDoctorUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    
    // Fetch doctor details using Axios
    const response = await axios.get(`${DOCTOR_SERVICE_URL}/username/${username}`);
    
    if (response.status !== 200) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const doctor = response.data;
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments for doctor', error });
  }
};   */

// Retrieve all appointments for a particular patient by username
/* export const getAppointmentsByPatientUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // Fetch patient details using Axios
    const response = await axios.get(`${PATIENT_SERVICE_URL}/username/${username}`);
    
    if (response.status !== 200) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const patient = response.data;
    const appointments = await Appointment.find({ patientId: patient._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments for patient', error });
  }
};  */

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error });
  }
};

// Update an existing appointment
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true });
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error });
  }
};

// Delete an appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const result = await Appointment.findByIdAndDelete(appointmentId);
    
    if (!result) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting appointment', error });
  }
};
