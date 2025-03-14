import {Router} from "express";

import {postLogin, postRegister} from "../controllers/authController.ts";

const router = Router();

router.post("/login", postLogin);

router.post("/register", postRegister);

export default router;
