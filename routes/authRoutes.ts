import {Router} from "express";

import {postLogin, postRegister, getLogout} from "../controllers/authController.ts";
import {validateRegisterInput, validateLoginInput} from "../middleware/validation.ts";

const router = Router();

router.post("/register", validateRegisterInput, postRegister);

router.post("/login", validateLoginInput, postLogin);

router.get("/logout", getLogout);

export default router;
