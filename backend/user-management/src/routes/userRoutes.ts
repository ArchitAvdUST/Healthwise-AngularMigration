import { Router } from "express"
import { getAllUsers,getUser,createUser } from "../controller/userController";

const router = Router();

router.get("/users",getAllUsers);

router.get("/users/:username",getUser);

router.post("/users",createUser);

export default router;