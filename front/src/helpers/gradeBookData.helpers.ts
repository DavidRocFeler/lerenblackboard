// data/gradeBookData.ts
import { IGradeBookStudent } from "@/interface/types";

export const gradeBookData: IGradeBookStudent = {
  studentInfo: {
    ie: "I.E. N° 32282 SAN MIGUEL",
    studentName: "VEDIA AYALA YAMELY",
    teacher: "JESUS SALVADOR Liliana",
    level: "PRIMARIA",
    gradeSection: "4° A",
    ugelNumber: "309 - LAURICOCHA",
    schoolYear: "2024"
  },
  subjects: [
    {
      name: "MATEMÁTICA",
      competences: [
        {
          description: "Resuelve problemas de cantidad.",
          period1: "A",
          period2: "A",
          period3: "AD",
          period4: "AD",
          finalGrade: "AD",
          descriptiveConclusions: "La estudiante demuestra un excelente dominio en la resolución de problemas matemáticos."
        },
        {
          description: "Resuelve problemas de regularidad, equivalencia y cambio.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "AD",
          finalGrade: "A",
          descriptiveConclusions: "Muestra progreso constante en patrones y equivalencias."
        },
        {
          description: "Resuelve problemas de forma, movimiento y localización.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Comprende conceptos geométricos satisfactoriamente."
        },
        {
          description: "Resuelve problemas de gestión de datos e incertidumbre.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Analiza e interpreta datos correctamente."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "COMUNICACIÓN",
      competences: [
        {
          description: "Se comunica oralmente en castellano en su lengua materna",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "AD",
          finalGrade: "A",
          descriptiveConclusions: "Excelente expresión oral y comprensión auditiva."
        },
        {
          description: "Lee diversos tipos de textos escritos en su lengua materna",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Demuestra comprensión lectora satisfactoria."
        },
        {
          description: "Escribe diversos tipos de textos en su lengua materna",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Redacta textos con coherencia y creatividad."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "ARTE Y CULTURA",
      competences: [
        {
          description: "Aprecia de manera crítica manifestaciones artístico-culturales.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Valora y comprende diferentes expresiones artísticas."
        },
        {
          description: "Crea proyectos desde los lenguajes artísticos.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Desarrolla proyectos artísticos con creatividad."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "INGLÉS COMO LENGUA EXTRANJERA",
      competences: [
        {
          description: "Se comunica oralmente en inglés como lengua extranjera.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Demuestra habilidades comunicativas en inglés."
        },
        {
          description: "Lee diversos tipos de textos escritos en inglés como lengua extranjera.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Comprende textos básicos en inglés."
        },
        {
          description: "Escribe diversos tipos de textos en inglés como lengua extranjera.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Redacta textos simples en inglés."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "PERSONAL SOCIAL",
      competences: [
        {
          description: "Construye su identidad.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Demuestra autoconocimiento y autoestima positiva."
        },
        {
          description: "Convive y participa democráticamente en la búsqueda del bien común.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Participa activamente en actividades grupales."
        },
        {
          description: "Construye interpretaciones históricas.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Comprende procesos históricos básicos."
        },
        {
          description: "Gestiona responsablemente el espacio y el ambiente.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Cuida y valora el medio ambiente."
        },
        {
          description: "Gestiona responsablemente los recursos económicos.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Comprende conceptos económicos básicos."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "CIENCIA Y TECNOLOGÍA",
      competences: [
        {
          description: "Indaga mediante métodos científicos para construir sus conocimientos.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Aplica el método científico en sus investigaciones."
        },
        {
          description: "Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, tierra y universo",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Comprende fenómenos naturales y científicos."
        },
        {
          description: "Diseña y construye soluciones tecnológicas para resolver problemas de su entorno",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Desarrolla soluciones creativas a problemas cotidianos."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "EDUCACIÓN FÍSICA",
      competences: [
        {
          description: "Se desenvuelve de manera autónoma a través de su motricidad.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Demuestra coordinación y control motor adecuado."
        },
        {
          description: "Asume una vida saludable",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Practica hábitos saludables constantemente."
        },
        {
          description: "Interactúa a través de sus habilidades sociomotrices.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Colabora efectivamente en actividades grupales."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "EDUCACIÓN RELIGIOSA",
      competences: [
        {
          description: "Construye su identidad como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Desarrolla valores espirituales y morales."
        },
        {
          description: "Asume la experiencia del encuentro personal y comunitario con Dios en su proyecto de vida en coherencia con su creencia religiosa.",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Vive coherentemente con sus valores religiosos."
        }
      ],
      areaGrade: "A"
    },
    {
      name: "COMPETENCIAS TRANSVERSALES A LAS ÁREAS",
      competences: [
        {
          description: "Se desenvuelve en entornos virtuales generados por las TIC",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Utiliza herramientas tecnológicas apropiadamente."
        },
        {
          description: "Gestiona su aprendizaje de manera autónoma",
          period1: "A",
          period2: "A",
          period3: "A",
          period4: "A",
          finalGrade: "A",
          descriptiveConclusions: "Demuestra autonomía en su proceso de aprendizaje."
        }
      ],
      areaGrade: "A"
    }
  ],
  attendance: {
    attended: {
      period1: 45,
      period2: 48,
      period3: 42,
      period4: 46
    },
    notAttended: {
      period1: 2,
      period2: 1,
      period3: 3,
      period4: 1
    },
    observations: "Excelente asistencia durante todo el año escolar."
  },
  parentEvaluation: {
    helpsWithHomework: {
      period1: "A",
      period2: "A",
      period3: "A",
      period4: "A"
    },
    attentiveToNeeds: {
      period1: "A",
      period2: "A",
      period3: "A",
      period4: "A"
    },
    attendsMeetings: {
      period1: "A",
      period2: "A",
      period3: "A",
      period4: "A"
    },
    observations: "Los padres muestran compromiso constante con la educación de su hija."
  },
  finalSituation: {
    promoted: true,
    repeatsGrade: false,
    requiresRecovery: false
  }
};