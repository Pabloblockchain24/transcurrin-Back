import { Router } from "express";
const router = Router()
import { resetPassword, changePassword, verifyEmail } from "../controllers/resetPassword.controller.js";

router.get("/resetPassword/:tid", resetPassword)
router.post("/changePassword/:tid", changePassword)
router.post("/verifyEmail", verifyEmail )


export default router