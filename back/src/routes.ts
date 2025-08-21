import { Router } from "express";
import studentRouter from "./student/student.routes";
import routerSchool from "./school/school.routes";
import adminRouter from "./superAdmin/superAdmin.routes";
import authRouter from "./auth/auth.routes";
import claudinaryRouter from "./claudinary/claudimary.routes";
import userRouter from "./user/user.routes";
import schoolCalendarRouter from "./schoolCalendar/schoolCalendar.routes";
import directorRouter from "./director/director.routes";
import schoolRouter from "./school/school.routes";

const router = Router();

router.use("/auth", authRouter); 
router.use('/claudinary', claudinaryRouter)
router.use('/user', userRouter)
router.use('/calendar', schoolCalendarRouter )

router.use('/school', schoolRouter)
router.use('/director', directorRouter)
router.use("/students", studentRouter)
router.use("/admins", adminRouter);

export default router;
