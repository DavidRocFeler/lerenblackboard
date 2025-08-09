import { JWT_SECRET } from "../config/envs";
import { ClaudinaryRepository } from "./claudinary.repository";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config/envs";
import { SchoolRepository } from "../school/school.repository";
import { SchoolEntity } from "../school/School.entity";

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
  // 1. Buscar imagen anterior
  const existingPicture = await ClaudinaryRepository.findOne({
    where: { userId: parseInt(userId), entityType: "user" }
  });

  if (existingPicture) {
    // console.log('🔍 Intentando eliminar:', existingPicture.cloudinaryPublicId);
    
    try {
      const deleteResult = await cloudinary.uploader.destroy(existingPicture.cloudinaryPublicId);
      // console.log('🗑️ Resultado eliminación Cloudinary:', deleteResult);
      
      if (deleteResult.result !== 'ok') {
        // console.error('❌ Error eliminando de Cloudinary:', deleteResult);
      }
      
      await ClaudinaryRepository.remove(existingPicture);
      // console.log('✅ Eliminado de DB');
    } catch (error) {
      // console.error('💥 Error en eliminación:', error);
    }
  }

  // 2. Subir nueva imagen
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

  // console.log('📤 Nuevo public_id:', uploadResult.public_id);

  // 3. Crear registro
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

// Helper para Cloudinary (mejor manejo de errores)
const uploadToCloudinary = (file: Express.Multer.File, folder: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        if (!result) return reject(new Error("Cloudinary returned no result"));
        resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

export const deletePictureSchoolByIdService = async (
  schoolId: string,
  category?: "logo" | "background"
) => {
  const school = await SchoolRepository.findOne({
    where: { id: parseInt(schoolId) },
    relations: ['logo', 'background']
  });

  if (!school) throw new Error("Escuela no encontrada");

  let deletedCount = 0;
  const updates: Partial<SchoolEntity> = {};

  // Eliminar logo si existe
  if ((!category || category === "logo") && school.logo) {
    await cloudinary.uploader.destroy(school.logo.cloudinaryPublicId);
    await ClaudinaryRepository.remove(school.logo);
    updates.background = undefined; // Usar undefined
    deletedCount++;
  }

  // Eliminar background si existe
  if ((!category || category === "background") && school.background) {
    await cloudinary.uploader.destroy(school.background.cloudinaryPublicId);
    await ClaudinaryRepository.remove(school.background);
    updates.background = undefined; // Usar undefined
    deletedCount++;
  }

  // Actualizar escuela solo si hubo cambios
  if (deletedCount > 0) {
    await SchoolRepository.update(school.id, updates);
  }

  return deletedCount;
};

// Servicio para subir imagen actualizado
export const uploadPictureSchoolByIdService = async (
  schoolId: string,
  file: Express.Multer.File,
  description?: string,
  category: "logo" | "background" = "logo"
) => {
  const school = await SchoolRepository.findOne({
    where: { id: parseInt(schoolId) },
    relations: ['logo', 'background']
  });
  
  if (!school) throw new Error("Escuela no encontrada");

  // 1. Eliminar imagen anterior si existe
  if (category === "logo" && school.logo) {
    await cloudinary.uploader.destroy(school.logo.cloudinaryPublicId);
    await ClaudinaryRepository.remove(school.logo);
  } else if (category === "background" && school.background) {
    await cloudinary.uploader.destroy(school.background.cloudinaryPublicId);
    await ClaudinaryRepository.remove(school.background);
  }

  // 2. Subir a Cloudinary
  const uploadResult = await uploadToCloudinary(file, `schools/${schoolId}/${category}`);

  // 3. Crear registro en BD
  const newPicture = ClaudinaryRepository.create({
    originalName: file.originalname,
    filename: uploadResult.public_id,
    cloudinaryUrl: uploadResult.secure_url,
    cloudinaryPublicId: uploadResult.public_id,
    mimeType: file.mimetype,
    size: file.size,
    description,
    category,
    entityType: "school"
  });

  const savedPicture = await ClaudinaryRepository.save(newPicture);

  // 4. Actualizar escuela con la nueva imagen
  if (category === "logo") {
    school.logo = savedPicture;
  } else {
    school.background = savedPicture;
  }

  await SchoolRepository.save(school); // Usar save() en lugar de update()

  return savedPicture;
};
