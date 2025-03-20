import {authorizePermissions} from "./../middleware/auth.ts";
import {Router} from "express";

import {getApplicationStats, getCurrentUser, updateUser} from "../controllers/userController.ts";
import {validateUpdateUserInput} from "../middleware/validation.ts";
import upload from "../middleware/multerMiddleware.ts";

const router = Router();

router.get("/current-user", getCurrentUser);

router.get("/admin/app-stats", authorizePermissions("admin"), getApplicationStats);

router.patch("/update-user", upload.single("avatar"), validateUpdateUserInput, updateUser);

export default router;
