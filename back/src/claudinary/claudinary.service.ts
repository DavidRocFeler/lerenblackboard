import { JWT_SECRET } from "../config/envs";
import { ClaudinaryRepository } from "./claudinary.repository";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config/envs";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Servicios para USUARIOS
export const getAllPictureUserService = async () => {
  return ClaudinaryRepository.createQueryBuilder("claudinary")
    .leftJoinAndSelect("claudinary.user", "user")
    .where("claudinary.entityType = :entityType", { entityType: "user" })
    .select([
      "claudinary.id",
      "claudinary.originalName",
      "claudinary.filename",
      "claudinary.cloudinaryUrl",
      "claudinary.cloudinaryPublicId",
      "claudinary.mimeType",
      "claudinary.size",
      "claudinary.description",
      "claudinary.category",
      "claudinary.entityType",
      "claudinary.createdAt",
      "claudinary.updatedAt",
      "claudinary.userId",
      "user.id",
      "user.role"
    ])
    .orderBy("claudinary.createdAt", "DESC")
    .getMany();
};

export const getPictureUserByIdService = async (userId: string, token: string) => {
  // Verificar token
  const decoded = jwt.verify(token, JWT_SECRET!) as any;
  
  return ClaudinaryRepository.createQueryBuilder("claudinary")
    .leftJoinAndSelect("claudinary.user", "user")
    .where("claudinary.userId = :userId", { userId })
    .andWhere("claudinary.entityType = :entityType", { entityType: "user" })
    .select([
      "claudinary.id",
      "claudinary.originalName",
      "claudinary.filename",
      "claudinary.cloudinaryUrl",
      "claudinary.cloudinaryPublicId",
      "claudinary.mimeType",
      "claudinary.size",
      "claudinary.description",
      "claudinary.category",
      "claudinary.entityType",
      "claudinary.createdAt",
      "claudinary.updatedAt",
      "claudinary.userId",
      "user.id",
      "user.role"
    ])
    .orderBy("claudinary.createdAt", "DESC")
    .getMany();
};

export const uploadPictureUserByIdService = async (
  userId: string, 
  file: Express.Multer.File,
  description?: string,
  category?: string
) => {
  // 1. Buscar y eliminar la imagen anterior del usuario (si existe)
  const existingPicture = await ClaudinaryRepository.findOne({
    where: { userId: parseInt(userId), entityType: "user" }
  });

  if (existingPicture) {
    await cloudinary.uploader.destroy(existingPicture.cloudinaryPublicId); // Elimina de Cloudinary
    await ClaudinaryRepository.remove(existingPicture); // Elimina de tu DB
  }

  // 2. Subir la nueva imagen (tu código actual)
  const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `claudinary/users/${userId}`,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    ).end(file.buffer);
  });

  // 3. Crear el nuevo registro (tu código actual)
  const newPicture = ClaudinaryRepository.create({
    originalName: file.originalname,
    filename: uploadResult.original_filename || file.originalname,
    cloudinaryUrl: uploadResult.secure_url,
    cloudinaryPublicId: uploadResult.public_id,
    mimeType: file.mimetype,
    size: file.size,
    description: description || undefined,
    category: (category as any) || "profile",
    entityType: "user",
    userId: parseInt(userId)
  });

  return await ClaudinaryRepository.save(newPicture);
};

export const deletePictureUserByIdService = async (userId: string) => {
  // Obtener todas las imágenes del usuario
  const pictures = await ClaudinaryRepository.find({
    where: { 
      userId: parseInt(userId),
      entityType: "user"
    }
  });

  // Eliminar de Cloudinary
  for (const picture of pictures) {
    await cloudinary.uploader.destroy(picture.cloudinaryPublicId);
  }

  // Eliminar de BD
  const result = await ClaudinaryRepository.delete({
    userId: parseInt(userId),
    entityType: "user"
  });

  return result.affected ? result.affected > 0 : false;
};

// Servicios para ESCUELAS
export const getAllPictureSchoolService = async () => {
  return ClaudinaryRepository.createQueryBuilder("claudinary")
    .leftJoinAndSelect("claudinary.school", "school")
    .where("claudinary.entityType = :entityType", { entityType: "school" })
    .select([
      "claudinary.id",
      "claudinary.originalName",
      "claudinary.filename",
      "claudinary.cloudinaryUrl",
      "claudinary.cloudinaryPublicId",
      "claudinary.mimeType",
      "claudinary.size",
      "claudinary.description",
      "claudinary.category",
      "claudinary.entityType",
      "claudinary.createdAt",
      "claudinary.updatedAt",
      "claudinary.schoolId",
      "school.id",
      "school.name",
      "school.slug"
    ])
    .orderBy("claudinary.createdAt", "DESC")
    .getMany();
};

export const getPictureSchoolByIdService = async (schoolId: string, token: string) => {
  // Verificar token
  const decoded = jwt.verify(token, JWT_SECRET!) as any;
  
  return ClaudinaryRepository.createQueryBuilder("claudinary")
    .leftJoinAndSelect("claudinary.school", "school")
    .where("claudinary.schoolId = :schoolId", { schoolId })
    .andWhere("claudinary.entityType = :entityType", { entityType: "school" })
    .select([
      "claudinary.id",
      "claudinary.originalName",
      "claudinary.filename",
      "claudinary.cloudinaryUrl",
      "claudinary.cloudinaryPublicId",
      "claudinary.mimeType",
      "claudinary.size",
      "claudinary.description",
      "claudinary.category",
      "claudinary.entityType",
      "claudinary.createdAt",
      "claudinary.updatedAt",
      "claudinary.schoolId",
      "school.id",
      "school.name",
      "school.slug"
    ])
    .orderBy("claudinary.createdAt", "DESC")
    .getMany();
};

export const uploadPictureSchoolByIdService = async (
  schoolId: string, 
  file: Express.Multer.File,
  description?: string,
  category?: string
) => {
  // Subir a Cloudinary
  const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `claudinary/schools/${schoolId}`,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as UploadApiResponse);
      }
    ).end(file.buffer);
  });

  // Crear en BD
  const newPicture = ClaudinaryRepository.create({
    originalName: file.originalname,
    filename: uploadResult.original_filename || file.originalname,
    cloudinaryUrl: uploadResult.secure_url,
    cloudinaryPublicId: uploadResult.public_id,
    mimeType: file.mimetype,
    size: file.size,
    description: description || undefined,
    category: (category as any) || "other",
    entityType: "school",
    schoolId: parseInt(schoolId)
  });

  return await ClaudinaryRepository.save(newPicture);
};

export const deletePictureSchoolByIdService = async (schoolId: string) => {
  // Obtener todas las imágenes de la escuela
  const pictures = await ClaudinaryRepository.find({
    where: { 
      schoolId: parseInt(schoolId),
      entityType: "school"
    }
  });

  // Eliminar de Cloudinary
  for (const picture of pictures) {
    await cloudinary.uploader.destroy(picture.cloudinaryPublicId);
  }

  // Eliminar de BD
  const result = await ClaudinaryRepository.delete({
    schoolId: parseInt(schoolId),
    entityType: "school"
  });

  return result.affected ? result.affected > 0 : false;
};