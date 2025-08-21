// src/services/director.service.ts
import { DirectorRepository } from "./director.repository";

// Query seguro con relaciones correctas
const secureDirectorQuery = () => DirectorRepository.createQueryBuilder('director')
  .leftJoinAndSelect('director.user', 'user')
  .leftJoinAndSelect("user.pictures", "pictures", "pictures.category = :category", { category: "profile" })
  .leftJoinAndSelect('director.school', 'school')
  .leftJoinAndSelect('director.credential', 'credential')
  .select([
    'director.id',
    'director.firstName',
    'director.lastName',
    'director.email',
    'director.phone',
    'director.governmentId',
    'director.address',
    'director.city',
    'director.country',
    'director.hireDate',
    'director.officeNumber',
    'director.isActive',
    'director.shift',

    'user.id',
    'user.role',

    'pictures.id',
    'pictures.cloudinaryUrl',
    'pictures.originalName',
    'pictures.category',
    'pictures.description',

    'school.id',
    'school.name',
  ])
  .where('director.isActive = :isActive', { isActive: true });

export const getAllDirectorsService = async () => {
  try {
    const directors = await secureDirectorQuery().getMany();

    return directors.map(director => ({
      id: director.id,
      firstName: director.firstName,
      lastName: director.lastName,
      email: director.email,
      phone: director.phone,
      governmentId: director.governmentId,
      address: director.address,
      city: director.city,
      country: director.country,
      hireDate: director.hireDate ? new Date(director.hireDate).toISOString().split('T')[0] : null,
      officeNumber: director.officeNumber,
      isActive: director.isActive,
      shift: director.shift,
      user: {
        id: director.user?.id,
        role: director.user?.role,
        pictures: director.user?.pictures || []
      },
      school: director.school ? {
        id: director.school.id,
        name: director.school.name
      } : null
    }));
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error('Error al obtener directores');
  }
};

export const getDirectorByIdService = async (id: number) => {
  const director = await secureDirectorQuery()
    .andWhere('director.id = :id', { id })
    .getOne();

  if (!director) return null;

  return {
    id: director.id,
    firstName: director.firstName,
    lastName: director.lastName,
    email: director.email,
    phone: director.phone,
    governmentId: director.governmentId,
    address: director.address,
    city: director.city,
    country: director.country,
    hireDate: director.hireDate,
    officeNumber: director.officeNumber,
    isActive: director.isActive,
    shift: director.shift,
    user: {
      id: director.user?.id,
      role: director.user?.role,
      profilePicture: director.user?.pictures?.[0] || null,
      pictures: director.user?.pictures || []
    },
    school: director.school ? {
      id: director.school.id,
      name: director.school.name
    } : null
  };
};

export const createDirectorService = async (directorData: any) => {
  if (!directorData.firstName || !directorData.lastName || 
      !directorData.email || !directorData.governmentId) {
    throw new Error("Faltan campos obligatorios");
  }

  const existingDirector = await DirectorRepository.findOne({
    where: [
      { email: directorData.email },
      { governmentId: directorData.governmentId }
    ]
  });

  if (existingDirector) {
    throw new Error("El email o documento de identidad ya están registrados");
  }

  const director = DirectorRepository.create(directorData);
  return await DirectorRepository.save(director);
};

export const updateDirectorService = async (id: number, updateData: any) => {
  const director = await DirectorRepository.findOneBy({ id });
  if (!director) throw new Error("Director no encontrado");

  DirectorRepository.merge(director, updateData);
  return await DirectorRepository.save(director);
};

export const deleteDirectorService = async (id: number) => {
  const director = await DirectorRepository.findOneBy({ id });
  if (!director) throw new Error("Director no encontrado");

  director.isActive = false;
  await DirectorRepository.save(director);
  return { message: "Director desactivado correctamente" };
};