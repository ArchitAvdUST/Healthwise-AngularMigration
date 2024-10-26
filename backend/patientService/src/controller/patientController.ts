import { Request, Response } from 'express';
import Patient from '../entity/patient'; // Adjust the path as necessary

// Create a new Patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error });
  }
};

// Get all Patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching all patients', error });
  }
};

// Get a single Patient by ID
export const getAPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: "Error fetching the patient", error: error });
  }
};

// Update a Patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, req.body, { new: true, runValidators: true });
    if (!updatedPatient) {
       res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: "Error updating the patient", error });
  }
};

// Delete a Patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const result = await Patient.findByIdAndDelete(patientId);
    if (!result) {
       res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully", patient: result });
  } catch (error) {
    res.status(400).json({ message: "Error deleting the patient", error});
  }
};

// Search Patients by Name
export const searchPatientsByName = async (req: Request, res: Response) => {
    const { name } = req.query;

    console.log("Searching for patients with name:", name);

    try {
        // Ensure name parameter is provided
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }

        const patients = await Patient.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error searching patients', error: error });
    }
};


// Get Patients by Age Range
export const getPatientsByAgeRange = async (req: Request, res: Response) => {
  const { min, max } = req.query;
  try {
    const patients = await Patient.find({ age: { $gte: min, $lte: max } });
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching patients by age range', error});
  }
};

// Get Patient Count
export const getPatientCount = async (req: Request, res: Response) => {
  try {
    const count = await Patient.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching patient count', error });
  }
};

// Get Patients by Sex
export const getPatientsBySex = async (req: Request, res: Response) => {
  const { sex } = req.params;
  try {
    const patients = await Patient.find({ sex });
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching patients by sex', error });
  }
};

// Get Medical History for a Patient
export const getMedicalHistory = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
       res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ medicalHistory: patient?.medicalHistory });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching medical history', error});
  }
};
