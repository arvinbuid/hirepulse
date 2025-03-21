import {Router} from "express";
import {
  getAllJobs,
  getJob,
  postCreateJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.ts";

import {validateJobInput, validateParamId} from "../middleware/validation.ts";
import {checkForDemoUser} from "../middleware/auth.ts";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", validateParamId, getJob);

router.post("/", checkForDemoUser, validateJobInput, postCreateJob);

router.patch("/:id", checkForDemoUser, validateParamId, validateJobInput, updateJob);

router.delete("/:id", checkForDemoUser, validateParamId, deleteJob);

export default router;
