import { Request, Response } from 'express';
import Timing from '../entity/timing'; // Adjust the import path as necessary

export const createTiming = async (req: Request, res: Response) => {
  try {
    const timing = new Timing(req.body);
    await timing.save();
    res.status(201).json(timing);
  } catch (error) {
    res.status(400).json({ message: 'Error creating timing record', error });
  }
};

export const getAllTimings = async (req: Request, res: Response) => {
  try {
    const timings = await Timing.find();
    res.status(200).json(timings);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching timing records', error });
  }
};

export const getTimingById = async (req: Request, res: Response) => {
  try {
    const { timingId } = req.params;
    const timing = await Timing.findById(timingId);
    if (!timing) {
      return res.status(404).json({ message: 'Timing record not found' });
    }
    res.status(200).json(timing);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching timing record', error });
  }
};

export const updateTiming = async (req: Request, res: Response) => {
  try {
    const { timingId } = req.params;
    const updatedTiming = await Timing.findByIdAndUpdate(timingId, req.body, { new: true });

    if (!updatedTiming) {
      return res.status(404).json({ message: 'Timing record not found' });
    }

    res.status(200).json(updatedTiming);
  } catch (error) {
    res.status(400).json({ message: 'Error updating timing record', error });
  }
};

export const deleteTiming = async (req: Request, res: Response) => {
  try {
    const { timingId } = req.params;
    const result = await Timing.findByIdAndDelete(timingId);

    if (!result) {
      return res.status(404).json({ message: 'Timing record not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting timing record', error });
  }
};

  export const getTimingsByDoctorId = async (req: Request, res: Response) => {
    try {
      const { doctorId } = req.params; // Get doctorId from URL parameters
      const timings = await Timing.find({ doctorId }); // Query for timings by doctorId
  
      if (timings.length === 0) {
        return res.status(404).json({ message: 'No timings found for this doctor' });
      }
  
      res.status(200).json(timings);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching timings for the doctor', error });
    }
  };
  

