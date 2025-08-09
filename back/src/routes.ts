import { Router } from "express";
import studentRouter from "./student/student.routes";
import routerSchool from "./school/school.routes";
import adminRouter from "./superAdmin/superAdmin.routes";
import authRouter from "./auth/auth.routes";
import claudinaryRouter from "./claudinary/claudimary.routes";
import userRouter from "./user/user.routes";

const router = Router();

router.use("/auth", authRouter); 
router.use('/claudinary', claudinaryRouter)
router.use('/user', userRouter)

router.use('/school', routerSchool)
router.use("/students", studentRouter)
router.use("/admins", adminRouter);

export default router;
