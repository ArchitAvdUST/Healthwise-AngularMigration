import { Router } from "express";
import { createDoctor, deleteDoctor, getADoctor, getAllDoctors, getDoctorsByDisease, updateDoctor } from "../controller/doctorController";

const router = Router();

router.post('/doctors',createDoctor);

router.get('/doctors',getAllDoctors);

router.get('/doctors/:doctorId',getADoctor);

router.put('/doctors',updateDoctor);

router.delete('/doctors/:doctorId',deleteDoctor);

router.get('/doctors/symptoms/:symptom',getDoctorsByDisease as any);

export default router;