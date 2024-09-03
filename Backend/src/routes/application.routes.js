import { Router } from "express";

import { jwtVerify } from "../middlewares/auth.middleware.js";
import { applyJob, getApplicant, getAppliedJob, updateStatus } from "../controller/application.controller.js";
import { roleCheck } from "../middlewares/role.middleware.js";

const router = Router();

router.route("/apply/:id").get(jwtVerify, applyJob)
router.route("/get").get(jwtVerify, getAppliedJob)
router.route("/:id/applicants").get(jwtVerify, roleCheck, getApplicant)
router.route("/status/:id/update").post(jwtVerify, roleCheck, updateStatus)

export default router;