import { Router } from "express";
import studentRouter from "./student.router";
import adminRouter from "./admin.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/students", studentRouter)
router.use("/admins", adminRouter);
router.use("/auth", authRouter); 

export default router;
