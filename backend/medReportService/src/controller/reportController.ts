import { Request, Response } from 'express';
import Report from '../entity/report'; // Adjust the import path as necessary

export const createReport = async (req: Request, res: Response) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: 'Error creating report', error });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching reports', error });
  }
};

export const getAReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching report', error });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const updatedReport = await Report.findByIdAndUpdate(reportId, req.body, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: 'Error updating report', error });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { reportId } = req.params;
    const result = await Report.findByIdAndDelete(reportId);
    if (!result) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting report', error });
  }
};
