import { Request, Response } from 'express';
import History from '../entity/history';

export const addHistoryForPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const { date, time, doctorUserName, symptoms, comment } = req.body;

    // New history entry to be added
    const newHistoryEntry = {
      date,
      time,
      doctorUserName,
      symptoms,
      comment
    };

    // Check if the patient already has a history record
    const existingHistory = await History.findOne({ patientId });

    if (existingHistory) {
      // If history exists, append the new entry
      existingHistory.history.push(newHistoryEntry);
      await existingHistory.save();
      res.status(201).json({
        message: 'History entry added for existing patient',
        history: existingHistory,
      });
    } else {
      // If no history exists, create a new history document for the patient
      const newHistory = new History({
        patientId,
        history: [newHistoryEntry],
      });
      await newHistory.save();
      res.status(201).json({
        message: 'New history record created for patient',
        history: newHistory,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding history entry for patient', error });
  }
};

// Get all history records for a specific patient
export const getHistoryByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    console.log(patientId);
    const historyRecord = await History.findOne({ patientId });

    if (!historyRecord || historyRecord.history.length === 0) {
      return res.status(404).json({ message: 'No history found for this patient' });
    }

    res.status(200).json(historyRecord.history); // Return only the history array
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving history records', error });
  }
};
