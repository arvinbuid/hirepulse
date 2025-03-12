import {Router} from "express";
import {
  getAllJobs,
  getJob,
  postCreateJob,
  editJob,
  deleteJob,
} from "../controllers/jobController.ts";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", getJob);

router.post("/", postCreateJob);

router.patch("/:id", editJob);

router.delete("/:id", deleteJob);

export default router;
