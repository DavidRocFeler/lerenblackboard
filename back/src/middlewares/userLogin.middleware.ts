import { Request, Response, NextFunction } from "express";
import { checkUserExists } from "../services/student.service";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) next({ message: "Missing fields", status: 400 });
  else next();
};

const validateStudentExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (!(await checkUserExists(email)))
    next({ message: "User does not exist", statusCode: 400 });
  else next();
};

export default [validateLogin, validateStudentExists];
