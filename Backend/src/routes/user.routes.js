import { loginUser, logoutUser, registerUser, updateUserProfile } from "../controller/user.controller.js";
import {jwtVerify } from "../middlewares/auth.middleware.js"
import {Router} from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post( upload.single("profilePhoto"), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(jwtVerify, logoutUser);
router.route("/profile/update").post(jwtVerify, upload.single("file"), updateUserProfile)

export default router;