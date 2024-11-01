import { Router } from "express"
import { getAllUsers,createUser, login, getRoleByUsername, getUser, deleteUser } from "../controller/userController";

const router = Router();

router.get("/users",getAllUsers);

router.post("/users",createUser);

router.post("/users/login",login as any);

router.get("/users/:username/role",getRoleByUsername);

router.get("/users/:username", getUser);

router.delete("/users/:username", deleteUser);

export default router;