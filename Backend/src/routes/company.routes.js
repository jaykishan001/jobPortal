import { Router } from "express";
import { registerCompany, getCompany, getComapanyById, updateCompanyInfo } from "../controller/company.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(jwtVerify, registerCompany)
router.route("/getCompany").get(jwtVerify, getCompany)
router.route("/get/:id").get(jwtVerify, getComapanyById)
router.route("/update/:id").put(jwtVerify, updateCompanyInfo)

export default router;