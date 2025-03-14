import {Router} from "express";

import {postLogin, postRegister} from "../controllers/authController.ts";
import {validateRegisterInput} from "../middleware/validation.ts";

const router = Router();

router.post("/login", postLogin);

router.post("/register", validateRegisterInput, postRegister);

export default router;
