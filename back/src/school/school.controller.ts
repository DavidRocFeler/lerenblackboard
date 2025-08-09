// src/controllers/school.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource'; // Asegúrate de tener esto configurado
import { ICreateSchoolDto, IUpdateSchoolDto } from './school.dto';
import { SchoolEntity } from './School.entity';
import { createSchoolService, updateSchoolService } from "./school.service";

export const createSchoolController = async (req: Request, res: Response) => {
  try {
    const schoolData: ICreateSchoolDto = req.body;
    
    // Crear la escuela (sin imágenes)
    const newSchool = await createSchoolService(schoolData);

    // Aquí podrías añadir lógica para manejar las imágenes si existen
    // Ejemplo:
    // if (req.files?.logoFile) {
    //   await handleSchoolLogoUpload(newSchool.id, req.files.logoFile);
    // }

    return res.status(201).json(newSchool);

  } catch (error: any) {
    console.error('Error creating school:', error);
    
    if (error.message === 'Nombre y slug son requeridos') {
      return res.status(400).json({ error: error.message });
    }
    
    if (error.message === 'La escuela ya existe') {
      return res.status(409).json({ error: error.message });
    }
    
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
      console.log('Iniciando búsqueda de escuelas...');
      
      const schoolRepository = AppDataSource.getRepository(SchoolEntity);
      
      // Primero prueba sin relaciones para verificar que la entidad funciona
      console.log('Probando consulta básica...');
      const basicSchools = await schoolRepository.find({
        order: { name: 'ASC' }
      });
      console.log(`Encontradas ${basicSchools.length} escuelas sin relaciones`);
      
      // Luego prueba con las relaciones específicas
      console.log('Probando con relaciones...');
      const schools = await schoolRepository.find({
        relations: ['directors', 'logo', 'background'], // Cambiado de 'director' a 'directors' (plural)
        order: { name: 'ASC' }
      });
      
      console.log(`Encontradas ${schools.length} escuelas con relaciones`);
      return res.json(schools);
      
    } catch (error: any) {
      console.error('Error detallado:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Error más específico según el tipo
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return res.status(500).json({ 
          error: 'Error de base de datos: Tabla no encontrada',
          details: error.message 
        });
      }
      
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        return res.status(500).json({ 
          error: 'Error de base de datos: Columna no encontrada',
          details: error.message 
        });
      }
      
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
      });
    }
  };


export const updateSchoolController = async (req: Request, res: Response) => {
  try {
    const updateData: IUpdateSchoolDto = req.body;
    const schoolId = Number(req.params.schoolId); // Convertir a número
    
    const updatedSchool = await updateSchoolService(schoolId, updateData);
    return res.json(updatedSchool);

  } catch (error: any) {
    console.error('Error updating school:', error);
    
    if (error.message === 'Escuela no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    
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