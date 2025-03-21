import { Router } from "express";
import userController from "../controllers/UserController.js";

const router = Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)

export default router