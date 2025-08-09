// src/services/school.service.ts
import { SchoolEntity } from "./School.entity";
import { SchoolRepository } from "./school.repository";
import { ICreateSchoolDto, IUpdateSchoolDto } from "./school.dto"; // Asegúrate de tener este DTO

export const updateSchoolService = async (
  schoolId: number,
  updateData: IUpdateSchoolDto
): Promise<SchoolEntity> => {
  // Verificar existencia
  const existingSchool = await SchoolRepository.findOne({ 
    where: { id: schoolId }
  });

  if (!existingSchool) {
    throw new Error('Escuela no encontrada');
  }

  // Actualizar solo campos permitidos
  const mergedSchool = SchoolRepository.merge(existingSchool, updateData);
  
  return await SchoolRepository.save(mergedSchool);
};

export const getSchoolByIdService = async (schoolId: number): Promise<SchoolEntity | null> => {
  return await SchoolRepository.findOne({ 
    where: { id: schoolId },
    relations: ['logo', 'background'] // Si necesitas cargar las relaciones de imágenes
  });
};

export const createSchoolService = async (schoolData: ICreateSchoolDto): Promise<SchoolEntity> => {
    // Validación de campos requeridos
    if (!schoolData.name || !schoolData.slug) {
      throw new Error('Nombre y slug son requeridos');
    }
  
    // Verificar si la escuela ya existe
    const existingSchool = await SchoolRepository.findOne({
      where: [
        { slug: schoolData.slug },
        { email: schoolData.email }
      ]
    });
    
    if (existingSchool) {
      throw new Error('La escuela ya existe');
    }
  
    // Crear nueva escuela (sin manejo de imágenes aquí)
    const newSchool = SchoolRepository.create({
      ...schoolData,
      // Excluir los campos de archivo que se manejarán aparte
      logo: undefined,
      background: undefined
    });
  
    return await SchoolRepository.save(newSchool);
  };