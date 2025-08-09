import { Request, Response } from "express";
import { catchedController } from "../config/utils/catchedController";
import { 
  getAllPictureUserService, 
  getPictureUserByIdService,
  uploadPictureUserByIdService,
  deletePictureUserByIdService,
  getAllPictureSchoolService,
  getPictureSchoolByIdService,
  uploadPictureSchoolByIdService,
  deletePictureSchoolByIdService,
} from "./claudinary.service";

// Controladores para USUARIOS
export const getAllPictureUserController = catchedController(async (req: Request, res: Response) => {
  const pictures = await getAllPictureUserService();
  res.status(200).json(pictures);
});

export const getPictureUserByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    
    const token = authHeader.split(" ")[1];
    const pictures = await getPictureUserByIdService(userId, token);
    res.status(200).json(pictures);
  }
);

export const uploadPictureUserByIdController = catchedController(
  async (req: Request, res: Response) => {
    console.log("Headers recibidos:", req.headers); // Verifica el Content-Type
    console.log("Archivo recibido:", req.file); // Debe mostrar el archivo
    console.log("Body recibido:", req.body);
    const { userId } = req.params;
    const { description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó ningún archivo" });
    }
    
    const uploadedPicture = await uploadPictureUserByIdService(
      userId, 
      req.file, 
      description, 
      category
    );
    
    res.status(201).json({
      message: "Imagen subida exitosamente",
      data: uploadedPicture
    });
  }
);

export const deletePictureUserByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    
    const deleted = await deletePictureUserByIdService(userId);
    
    if (deleted) {
      res.status(200).json({ message: "Imágenes del usuario eliminadas exitosamente" });
    } else {
      res.status(404).json({ message: "No se encontraron imágenes para eliminar" });
    }
  }
);

// Controladores para ESCUELAS
export const getAllPictureSchoolController = catchedController(async (req: Request, res: Response) => {
  const pictures = await getAllPictureSchoolService();
  res.status(200).json(pictures);
});

export const getPictureSchoolByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { schoolId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    
    const token = authHeader.split(" ")[1];
    const pictures = await getPictureSchoolByIdService(schoolId, token);
    res.status(200).json(pictures);
  }
);

export const uploadPictureSchoolByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { schoolId } = req.params;
    const { description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó ningún archivo" });
    }

    // Validación de categoría segura
    const validCategory = 
      category === "logo" || category === "background" 
        ? category 
        : "logo";

    try {
      const uploadedPicture = await uploadPictureSchoolByIdService(
        schoolId, 
        req.file, 
        description, 
        validCategory
      );
      
      return res.status(201).json({
        message: "Imagen subida exitosamente",
        data: uploadedPicture
      });
    } catch (error) {
      console.error("Error uploading picture:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  }
);

export const deletePictureSchoolByIdController = catchedController(
  async (req: Request, res: Response) => {
    const { schoolId } = req.params;
    const { category } = req.query; // Opcional: 'logo' o 'background'
    
    try {
      const deletedCount = await deletePictureSchoolByIdService(
        schoolId, 
        category as "logo" | "background" | undefined
      );
      
      if (deletedCount > 0) {
        return res.status(200).json({ 
          message: `Se eliminaron ${deletedCount} imagen(es) de la escuela`
        });
      }
      return res.status(404).json({ 
        message: "No se encontraron imágenes para eliminar" 
      });
    } catch (error) {
      console.error("Error deleting school pictures:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Error al eliminar imágenes"
      });
    }
  }
);