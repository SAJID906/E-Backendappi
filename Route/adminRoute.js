import express from "express";
import { DelUser, Getuser } from "../Controller/adminController.js";
import { checkAdmin } from "../middleware/varify.js";
const adminRouter=express.Router();
adminRouter.get('/getuser', checkAdmin, Getuser)
adminRouter.post('/delte/:id', checkAdmin,DelUser)
export default adminRouter;