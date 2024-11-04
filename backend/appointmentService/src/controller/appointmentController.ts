import { Request, Response } from 'express';
import Appointment from '../entity/appointment'; // Adjust the import path as necessary
import axios from 'axios';

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
export const getAppointmentsByDoctorUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params; // Extract username from the URL parameters

    // Find appointments by doctor's username
    const appointments = await Appointment.find({ doctorUserName: username });

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments for doctor', error });
  }
};

export const getAAppointment = async(req: Request, res:Response) => {
  try{
    const { appointmentId } = req.params;
    const response = await Appointment.findById(appointmentId);
    res.status(200).json(response);
  }
  catch(error){
    res.status(404).json({message:"Not found", error});
  }

}

// Retrieve all appointments for a particular patient by username
export const getAppointmentsByPatientUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    console.log("Passed Checkpoint 0")
    // Fetch patient details using Axios
    const response = await axios.get(`http://localhost:5000/api/patients/${username}`);
    console.log("Passed checkpoint 1");
    if (response.status !== 200) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const patient = response.data;
    const appointments = await Appointment.find({ patientId: patient.username });
    console.log("Passed checkpoint 2");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments for patient', error });
  }
};  

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



