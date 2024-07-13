import { Router } from "express";
const router = Router()
import {login,loginApp, register,logout,profile,verifyToken,sendMail, sendMailReset} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema} from "../middlewares/validator.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", login)
router.post("/loginApp", loginApp)


router.post("/logout", logout)
router.get("/profile", authRequired, profile)
router.get("/verify", verifyToken)

router.post("/sendMail", sendMail)
router.post("/sendMailReset", sendMailReset)



export default router