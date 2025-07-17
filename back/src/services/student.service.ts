import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/student.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await StudentRepository.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<Student> => {
  const user = await StudentRepository.create(registerUserDto);
  await StudentRepository.save(user);
  const credential = await createCredentialService({
    password: registerUserDto.password,
  });
  user.credential = credential;
  await StudentRepository.save(user);
  return user;
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: Student }> => {
  const user: Student | null = await StudentRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return {
      user,
      token,
    };
  } else {
    throw new ClientError("Invalid password");
  }
};

export const getUsersService = async (): Promise<Student[]> => {
  const users = await StudentRepository.find({
    relations: ["credential"], // Incluye relaciones si es necesario
  });

  if (!users.length) {
    throw new Error("No users found");
  }

  return users;
};
