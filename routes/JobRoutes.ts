import {Router} from "express";
import {
  getAllJobs,
  getJob,
  postCreateJob,
  updateJob,
  deleteJob,
  getStats,
} from "../controllers/jobController.js";

import {validateJobInput, validateParamId} from "../middleware/validation.js";
import {checkForDemoUser} from "../middleware/auth.js";

const router = Router();

router.get("/stats", getStats);

router.get("/", getAllJobs);

router.get("/:id", validateParamId, getJob);

router.post("/", checkForDemoUser, validateJobInput, postCreateJob);

router.patch("/:id", checkForDemoUser, validateParamId, validateJobInput, updateJob);

router.delete("/:id", checkForDemoUser, validateParamId, deleteJob);

export default router;
