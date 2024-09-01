import { Router } from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";

const router = Router();

router.route("/post").post(jwtVerify, roleCheck ,postJob)
router.route("/get").get(jwtVerify, getAllJobs)
router.route("/get/:id").post(jwtVerify, getJobById)
router.route("/getAdminJobs").get(jwtVerify, roleCheck, getAdminJobs)

export default router;