import {Router} from "express";
import {
  getAllJobs,
  getJob,
  postCreateJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.ts";

import {validateJobInput, validateParamId} from "../middleware/validation.ts";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", validateParamId, getJob);

router.post("/", validateJobInput, postCreateJob);

router.patch("/:id", validateParamId, validateJobInput, updateJob);

router.delete("/:id", validateParamId, deleteJob);

export default router;
