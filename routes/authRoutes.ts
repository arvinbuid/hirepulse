import {Router} from "express";

import {postLogin, postRegister, getLogout} from "../controllers/authController.js";
import {validateRegisterInput, validateLoginInput} from "../middleware/validation.js";

const router = Router();

router.post("/register", validateRegisterInput, postRegister);

router.post("/login", validateLoginInput, postLogin);

router.get("/logout", getLogout);

export default router;
