import { Router } from "express"
import { getAllUsers,createUser, login, getRoleByUsername } from "../controller/userController";

const router = Router();

router.get("/users",getAllUsers);

router.post("/users",createUser);

router.post("/users/login",login as any);

router.get("/users/:username/role",getRoleByUsername);

export default router;