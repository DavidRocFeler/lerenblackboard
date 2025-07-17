import { Router } from "express";
import studentRouter from "./student.router";
import adminRouter from "./admin.routesr";

const router = Router();

// router.use("/schools", usersRouter);
// router.use("/levels", usersRouter);
// router.use("/grade", usersRouter);
// router.use("/section", usersRouter);
router.use("/students", studentRouter)
router.use("/admins", adminRouter);

export default router;
