import express from "express";
import { LogIn, Logout, SignUp } from "../Controller/userController.js";
const router=express.Router()
router.post('/',SignUp)
router.post('/login',LogIn)
router.post('/logout',Logout)

export default router;