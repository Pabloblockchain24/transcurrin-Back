import { Router } from "express";
const router = Router()
import {login,register,logout,profile,verifyToken} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema} from "../middlewares/validator.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";




router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)

router.post("/logout", logout)
router.get("/profile", authRequired, profile)
router.get("/verify", verifyToken)

export default router