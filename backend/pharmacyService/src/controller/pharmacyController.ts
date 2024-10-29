import { Request, Response } from 'express';
import Pharmacy from '../entity/pharmacy'; // Adjust the import path as necessary

export const createPharmacy = async (req: Request, res: Response) => {
  try {
    const pharmacy = new Pharmacy(req.body);
    await pharmacy.save();
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pharmacy record', error });
  }
};

export const getAllPharmacies = async (req: Request, res: Response) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching pharmacy records', error });
  }
};

export const getPharmacyById = async (req: Request, res: Response) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy record not found' });
    }
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching pharmacy record', error });
  }
};

export const updatePharmacy = async (req: Request, res: Response) => {
  try {
    const { pharmacyId } = req.params;
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(pharmacyId, req.body, { new: true });
    
    if (!updatedPharmacy) {
      return res.status(404).json({ message: 'Pharmacy record not found' });
    }

    res.status(200).json(updatedPharmacy);
  } catch (error) {
    res.status(400).json({ message: 'Error updating pharmacy record', error });
  }
};

export const deletePharmacy = async (req: Request, res: Response) => {
  try {
    const { pharmacyId } = req.params;
    const result = await Pharmacy.findByIdAndDelete(pharmacyId);

    if (!result) {
      return res.status(404).json({ message: 'Pharmacy record not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting pharmacy record', error });
  }
};
