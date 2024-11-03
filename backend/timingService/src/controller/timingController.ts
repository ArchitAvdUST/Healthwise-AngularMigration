import { Request, Response } from 'express';
import Timing from '../entity/timing'; // Adjust the import path as necessary

interface Slot {
  start: Date;
  end: Date;
  isAvailable: boolean;
}

async function createTimingsForDoctor(doctorId: string, date: string, start: string, end: string) {
  const dateOnly = new Date(date);
  const startTime = new Date(`${date}T${start}`);
  const endTime = new Date(`${date}T${end}`);
  const slots = [];

  let current = new Date(startTime);

  while (current < endTime) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.setMinutes(current.getMinutes() + 15));
    slots.push({ start: slotStart, end: slotEnd, isAvailable: true });
  }

  // Save the generated slots to the database
  await Timing.create({ doctorId, date: dateOnly, slots });
}

export const createTiming = async (req: Request, res: Response) => {
  const { doctorId, date, start, end } = req.body;

  // Validate the input data
  if (!doctorId || !date || !start || !end) {
    return res.status(400).json({ error: "doctorId, date, start, and end times are required" });
  }

  try {
    // Call the function to create and save timings
    await createTimingsForDoctor(doctorId, date, start, end);
    res.status(201).json({ message: "Timings created successfully." });
  } catch (error) {
    console.error("Error creating timings:", error);
    res.status(500).json({ error: "Internal server error" });
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
  

