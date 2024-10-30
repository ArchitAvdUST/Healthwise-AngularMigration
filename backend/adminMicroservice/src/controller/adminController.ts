import { Request, Response } from 'express';
import Admin from '../entity/admin'; // Adjust the path as necessary

// Create a new admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a specific admin by ID
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!admin) {
      return res.status(404).send();
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a specific admin by ID
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findOneAndDelete({ id: req.params.id });
    if (!admin) {
      return res.status(404).send();
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAdmin = async(req:Request, res:Response) => {
  try{
    const admins = await Admin.find();
    res.status(200).json(admins);
  }
  catch(error) {
    res.status(500).send();
  }
}