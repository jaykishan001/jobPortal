import { Router } from "express";

import { jwtVerify } from "../middlewares/auth.middleware.js";
import { applyJob, getApplicant, getAppliedJob, updateStatus } from "../controller/application.controller.js";

const router = Router();

router.route("/apply/:id").post(jwtVerify, applyJob)
router.route("/get").get(jwtVerify, getAppliedJob)
router.route("/:id/applicants").get(jwtVerify, getApplicant)
router.route("/status/:id/update").put(jwtVerify, updateStatus)

export default router;