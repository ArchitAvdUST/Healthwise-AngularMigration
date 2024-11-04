import { Request, Response } from 'express';
import History from '../entity/history'; // Adjust the import path as necessary

export const addHistory = async (req: Request, res: Response) => {
  const { patientId, history, date, time, doctorUserName, symptoms } = req.body;

  try {
    const newHistory = new History({
      patientId,
      history,
      date,
      time,
      doctorUserName,
      symptoms,
    });

    await newHistory.save();
    res.status(201).json({ message: 'History added successfully', data: newHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding history', error });
  }
};

// Get history records by patient ID
export const getHistoryByPatientId = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const historyRecords = await History.find({ patientId });
    res.status(200).json({ message: 'History records retrieved successfully', data: historyRecords });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving history records', error });
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
