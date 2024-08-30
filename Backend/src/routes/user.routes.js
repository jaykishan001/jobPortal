import { loginUser, logoutUser, registerUser, updateUserProfile } from "../controller/user.controller.js";
import {jwtVerify } from "../middlewares/auth.middleware.js"

import {Router} from "express";
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(jwtVerify, logoutUser);
router.route("/update-profile").post(jwtVerify, updateUserProfile)

export default router;