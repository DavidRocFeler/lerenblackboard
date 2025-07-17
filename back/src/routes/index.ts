import { Router } from "express";
import usersRouter from "./users.router";

const router = Router();

router.use("/schools", usersRouter);
router.use("/levels", usersRouter);
router.use("/grade", usersRouter);
router.use("/section", usersRouter);
router.use("/students", usersRouter);

export default router;
