import { Request, Response } from 'express';
import History from '../entity/history'; // Adjust the import path as necessary

export const createHistory = async (req: Request, res: Response) => {
  try {
    const history = new History(req.body);
    await history.save();
    res.status(201).json(history);
  } catch (error) {
    res.status(400).json({ message: 'Error creating history', error });
  }
};

export const getAllHistories = async (req: Request, res: Response) => {
  try {
    const histories = await History.find();
    res.status(200).json(histories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching histories', error });
  }
};

export const getHistoriesByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const histories = await History.find({ patientId });
    res.status(200).json(histories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching histories for patient', error });
  }
};

export const updateHistory = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const updatedHistory = await History.findOneAndUpdate(
      { patientId },
      req.body,
      { new: true }
    );
    
    if (!updatedHistory) {
      return res.status(404).json({ message: 'History not found for this patient' });
    }

    res.status(200).json(updatedHistory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating history', error });
  }
};

export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const result = await History.findOneAndDelete({ patientId });

    if (!result) {
      return res.status(404).json({ message: 'History not found for this patient' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting history', error });
  }
};
