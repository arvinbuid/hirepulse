import {Router} from "express";

import {getLogin, getRegister} from "../controllers/authController.ts";

const router = Router();

router.get("/login", getLogin);

router.get("/register", getRegister);

export default router;
