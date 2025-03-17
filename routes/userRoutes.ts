import {authorizePermissions} from "./../middleware/auth.ts";
import {Router} from "express";

import {getApplicationStats, getCurrentUser, updateUser} from "../controllers/userController.ts";
import {validateUpdateUserInput} from "../middleware/validation.ts";

const router = Router();

router.get("/current-user", getCurrentUser);

router.get("/admin/app-stats", authorizePermissions("admin"), getApplicationStats);

router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
