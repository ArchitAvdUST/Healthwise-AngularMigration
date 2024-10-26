import { Router } from "express";
import { createDoctor, deleteDoctor, getADoctor, getAllDoctors, updateDoctor } from "../controller/doctorController";

const router = Router();

router.post('/doctors',createDoctor);

router.get('/doctors',getAllDoctors);

router.get('/doctors/:doctorId',getADoctor);

router.put('/doctors',updateDoctor);

router.delete('/doctors/:doctorId',deleteDoctor);

export default router;