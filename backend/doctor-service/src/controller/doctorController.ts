import { Request, Response } from 'express';
import Doctor from '../entity/doctor';

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating doctor', error });
  }
};

export const getAllDoctors = async(req: Request, res: Response) => {
    try{
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    }
    catch(error){
        res.status(400).json({message: 'Error fetching all doctor',error});
    }
};

export const getADoctor = async(req: Request, res: Response) => {
    try{
        const {doctorId} = req.params;
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            res.status(404).json({message: "Doctor not found"});
        }
        else{
            res.status(200).json(doctor);
        }
    }
    catch(error){
        res.status(400).json({message: "Error fetching a doctor", error});
    }
};

export const updateDoctor = async(req: Request,res: Response) => {
    try{
        const editDoctor = new Doctor(req.body);
        await editDoctor.save();
        res.status(200).json(editDoctor);
    }
    catch(error){
        res.status(400).json({message:"Error updating a doctor",error});
    }
};

export const deleteDoctor = async(req: Request,res:Response) => {
    try{
        const {doctorId} = req.params;
        const result =await Doctor.findByIdAndDelete(doctorId);
        if(!result){
            res.status(404).json({message:"Doctor not found"});
        }
        else{
            res.status(200).json(result);
        }
    }
    catch(error){
        res.status(400).json({message:"Error deleting a doctor",type: error});
    }
};
