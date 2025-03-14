import {Router} from "express";
import {
  getAllJobs,
  getJob,
  postCreateJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.ts";

import {validateJobInput} from "../middleware/validation.ts";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", getJob);

router.post("/", validateJobInput, postCreateJob);

router.patch("/:id", validateJobInput, updateJob);

router.delete("/:id", deleteJob);

export default router;
