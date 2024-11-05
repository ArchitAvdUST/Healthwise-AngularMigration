import { Request, Response } from 'express';
import Billing from '../entity/billing'; // Adjust the import path as necessary

export const createBilling = async (req: Request, res: Response) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).json(billing);
  } catch (error) {
    res.status(400).json({ message: 'Error creating billing record', error });
  }
};

export const getAllBillings = async (req: Request, res: Response) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching billing records', error });
  }
};

export const getBillingById = async (req: Request, res: Response) => {
  try {
    const { billingId } = req.params;
    const billing = await Billing.findById(billingId);
    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching billing record', error });
  }
};
export const getBillingByAppointmentId = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params; // Extract appointmentId from URL params
    const billing = await Billing.findOne({ appointmentId });

    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found for this appointment' });
    }

    res.status(200).json(billing);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching billing record by appointment ID', error });
  }
};

export const updateBilling = async (req: Request, res: Response) => {
  try {
    const { billingId } = req.params;
    const updatedBilling = await Billing.findByIdAndUpdate(billingId, req.body, { new: true });
    
    if (!updatedBilling) {
      return res.status(404).json({ message: 'Billing record not found' });
    }

    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(400).json({ message: 'Error updating billing record', error });
  }
};

export const deleteBilling = async (req: Request, res: Response) => {
  try {
    const { billingId } = req.params;
    const result = await Billing.findByIdAndDelete(billingId);

    if (!result) {
      return res.status(404).json({ message: 'Billing record not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting billing record', error });
  }
};

export const getBillingByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params; // Extract patientId from the request params
    // Fetch all billing records for the specified patient
    const billings = await Billing.find({ patientId });

    // If no billings are found for the patient
    if (!billings || billings.length === 0) {
      return res.status(404).json({ message: 'No billing records found for this patient' });
    }

    // Return the found billings
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching billing records', error });
  }
};