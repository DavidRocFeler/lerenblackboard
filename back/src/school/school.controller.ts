// src/controllers/school.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource'; // Asegúrate de tener esto configurado
import { ICreateSchoolDto, IUpdateSchoolDto } from './school.dto';
import { SchoolEntity } from './School.entity';

export const createSchoolController = async (req: Request, res: Response) => {
  try {
    // Obtener el repositorio de la manera moderna
    const schoolRepository = AppDataSource.getRepository(SchoolEntity);
    const schoolData: ICreateSchoolDto = req.body;
    
    // Validación básica
    if (!schoolData.name || !schoolData.slug) {
      return res.status(400).json({ error: 'Nombre y slug son requeridos' });
    }

    // Verificar si la escuela ya existe
    const existingSchool = await schoolRepository.findOne({
      where: [
        { slug: schoolData.slug },
        { email: schoolData.email }
      ]
    });
    
    if (existingSchool) {
      return res.status(409).json({ error: 'La escuela ya existe' });
    }

    // Crear nueva escuela
    const newSchool = schoolRepository.create({
      name: schoolData.name,
      slug: schoolData.slug,
      address: schoolData.address,
      city: schoolData.city,
      stateOrRegion: schoolData.stateOrRegion,
      country: schoolData.country,
      phone: schoolData.phone,
      email: schoolData.email,
      educationLevel: schoolData.educationLevel,
      shifts: schoolData.shifts,
      logo: schoolData.logo || undefined,
      background: schoolData.background || undefined,
      primaryColor: schoolData.primaryColor || undefined,
      secondaryColor: schoolData.secondaryColor || undefined,
      regulatoryCode: schoolData.regulatoryCode || undefined,
      regulatoryEntity: schoolData.regulatoryEntity || undefined
    });

    const savedSchool = await schoolRepository.save(newSchool);
    return res.status(201).json(savedSchool);

  } catch (error) {
    console.error('Error creating school:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getSchoolByIdControler = async (req: Request, res: Response) => {
    try {
      const schoolRepository = AppDataSource.getRepository(SchoolEntity);
      const school = await schoolRepository.findOne({
        where: { id: Number(req.params.schoolId) }, // Convertir a número
        relations: ['students', 'teachers', 'director', 'subdirector']
      });
  
      if (!school) {
        return res.status(404).json({ error: 'Escuela no encontrada' });
      }
  
      return res.json(school);
    } catch (error) {
      console.error('Error fetching school:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export const getAllSchoolsController = async (req: Request, res: Response) => {
  try {
    const schoolRepository = AppDataSource.getRepository(SchoolEntity);
    const schools = await schoolRepository.find({
      relations: ['director'],
      order: { name: 'ASC' }
    });
    return res.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateSchoolController = async (req: Request, res: Response) => {
    try {
      const schoolRepository = AppDataSource.getRepository(SchoolEntity);
      const updateData: IUpdateSchoolDto = req.body;
      const schoolId = Number(req.params.schoolId); // Convertir a número
      
      // Verificar existencia (sintaxis correcta para TypeORM v0.3.x)
      const existingSchool = await schoolRepository.findOne({ 
        where: { id: schoolId }
      });
  
      if (!existingSchool) {
        return res.status(404).json({ error: 'Escuela no encontrada' });
      }
  
      // Actualizar solo campos permitidos (sin updatedAt si no existe en la entidad)
      const mergedSchool = schoolRepository.merge(existingSchool, updateData);
  
      const updatedSchool = await schoolRepository.save(mergedSchool);
      return res.json(updatedSchool);
  
    } catch (error) {
      console.error('Error updating school:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  export const deleteSchoolController = async (req: Request, res: Response) => {
    try {
      const schoolRepository = AppDataSource.getRepository(SchoolEntity);
      const schoolId = Number(req.params.schoolId); // Convertir a número
      
      // Sintaxis correcta para TypeORM v0.3.x
      const school = await schoolRepository.findOne({
        where: { id: schoolId },
        relations: ['students', 'teachers']
      });
  
      if (!school) {
        return res.status(404).json({ error: 'Escuela no encontrada' });
      }
  
      // Verificar si tiene relaciones
      if (school.students?.length > 0 || school.teachers?.length > 0) {
        return res.status(400).json({ 
          error: 'No se puede eliminar la escuela porque tiene estudiantes o profesores asociados' 
        });
      }
  
      await schoolRepository.delete(schoolId);
      return res.status(204).send();
  
    } catch (error) {
      console.error('Error deleting school:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };