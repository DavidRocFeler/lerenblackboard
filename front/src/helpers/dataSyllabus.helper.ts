import { ISubject } from "@/interface/types";

export const subjectsData: ISubject[] = [
  // 1. Materias Clásicas (Base Fundamental)
  {
    id: 'comunicacion',
    name: 'Comunicación Integral',
    category: 'classic',
    description: 'Lectura, escritura y comprensión lectora',
    progress: 60,
    content: [
      {
        title: 'Habilidades principales',
        items: [
          'Comprensión de textos narrativos',
          'Producción de textos descriptivos',
          'Comunicación oral efectiva'
        ]
      },
      {
        title: 'Actividades',
        items: [
          'Club de lectura semanal',
          'Taller de escritura creativa',
          'Presentaciones orales'
        ]
      }
    ]
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    category: 'classic',
    description: 'Operaciones básicas, resolución de problemas, introducción a la lógica',
    progress: 75,
    content: [
      {
        title: 'Contenidos principales',
        items: [
          'Operaciones aritméticas básicas',
          'Resolución de problemas matemáticos',
          'Introducción a la lógica matemática'
        ]
      }
    ]
  },
  {
    id: 'ciencia-ambiente',
    name: 'Ciencia y Ambiente',
    category: 'classic',
    description: 'Exploración del entorno, experimentos simples',
    progress: 65,
    content: [
      {
        title: 'Áreas de estudio',
        items: [
          'Ciencias naturales básicas',
          'Experimentación científica',
          'Ecología local'
        ]
      }
    ]
  },
  {
    id: 'personal-social',
    name: 'Personal Social',
    category: 'classic',
    description: 'Valores, convivencia, identidad cultural peruana',
    progress: 70,
    content: [
      {
        title: 'Enfoques',
        items: [
          'Educación cívica',
          'Historia local',
          'Identidad cultural'
        ]
      }
    ]
  },
  {
    id: 'arte-cultura',
    name: 'Arte y Cultura',
    category: 'classic',
    description: 'Música, dibujo, danzas peruanas',
    progress: 55,
    content: [
      {
        title: 'Disciplinas',
        items: [
          'Expresión musical',
          'Artes plásticas',
          'Danzas tradicionales'
        ]
      }
    ]
  },
  {
    id: 'educacion-fisica',
    name: 'Educación Física',
    category: 'classic',
    description: 'Psicomotricidad, deportes, salud',
    progress: 80,
    content: [
      {
        title: 'Componentes',
        items: [
          'Desarrollo psicomotor',
          'Deportes básicos',
          'Educación para la salud'
        ]
      }
    ]
  },

  // 2. Materias Innovadoras (Para Integración Económica y Tecnológica)
  // Tecnología y Digitalización
  {
    id: 'robotica',
    name: 'Robótica Básica',
    category: 'innovative',
    description: 'Armado de robots simples con bloques programables',
    progress: 45,
    content: [
      {
        title: 'Proyectos',
        items: [
          'Construcción de robot seguidor de línea',
          'Programación con bloques',
          'Competencias internas de robótica'
        ]
      }
    ]
  },
  {
    id: 'programacion',
    name: 'Introducción a la Programación',
    category: 'innovative',
    description: 'Scratch Jr., pensamiento algorítmico',
    progress: 30,
    content: [
      {
        title: 'Lenguajes y herramientas',
        items: [
          'Scratch Jr. para principiantes',
          'Pensamiento computacional',
          'Creación de historias interactivas'
        ]
      }
    ]
  },
  {
    id: 'ia',
    name: 'Uso Responsable de IA',
    category: 'innovative',
    description: 'Chatbots educativos, herramientas digitales',
    progress: 25,
    content: [
      {
        title: 'Enfoques',
        items: [
          'Interacción con chatbots educativos',
          'Herramientas de IA para el aprendizaje',
          'Ética digital'
        ]
      }
    ]
  },

  // Economía y Finanzas
  {
    id: 'educacion-financiera',
    name: 'Educación Financiera para Niños',
    category: 'innovative',
    description: 'Ahorro, trueque digital, monedas virtuales',
    progress: 40,
    content: [
      {
        title: 'Conceptos',
        items: [
          'Sistema económico básico',
          'Ahorro y presupuesto',
          'Monedas digitales'
        ]
      }
    ]
  },
  {
    id: 'emprendimiento',
    name: 'Emprendimiento Infantil',
    category: 'innovative',
    description: 'Proyectos colaborativos, ferias escolares',
    progress: 35,
    content: [
      {
        title: 'Actividades',
        items: [
          'Desarrollo de proyectos',
          'Ferias escolares',
          'Trabajo colaborativo'
        ]
      }
    ]
  },

  // Globalización e Idiomas
  {
    id: 'ingles-tecnologico',
    name: 'Inglés',
    category: 'innovative',
    description: 'Aprende con de manera interactiva con Duolingo',
    progress: 50,
    content: [
      {
        title: 'Enfoque',
        items: [
          'Terminología tecnológica',
          'Inglés para negocios básico',
          'Comunicación global'
        ]
      }
    ]
  },
  {
    id: 'chino-mandarin',
    name: 'Chino Mandarín Básico',
    category: 'innovative',
    description: 'Introducción a través de juegos',
    progress: 20,
    content: [
      {
        title: 'Métodos',
        items: [
          'Aprendizaje lúdico',
          'Caracteres básicos',
          'Cultura china'
        ]
      }
    ]
  },

  // Ciencia Aplicada
  {
    id: 'ecologia',
    name: 'Ecología y Sostenibilidad',
    category: 'innovative',
    description: 'Huertos escolares, reciclaje tecnológico',
    progress: 60,
    content: [
      {
        title: 'Proyectos',
        items: [
          'Huerto escolar',
          'Reciclaje creativo',
          'Tecnología sostenible'
        ]
      }
    ]
  },
  {
    id: 'energias-renovables',
    name: 'Energías Renovables',
    category: 'innovative',
    description: 'Juguetes solares, proyectos eólicos simples',
    progress: 45,
    content: [
      {
        title: 'Experimentación',
        items: [
          'Energía solar práctica',
          'Modelos eólicos',
          'Conservación energética'
        ]
      }
    ]
  },

  // Habilidades Blandas
  // {
  //   id: 'pensamiento-global',
  //   name: 'Pensamiento Global',
  //   category: 'innovative',
  //   description: 'Trabajo en equipo con niños de otros países vía plataformas educativas',
  //   progress: 55,
  //   content: [
  //     {
  //       title: 'Enfoque',
  //       items: [
  //         'Colaboración internacional',
  //         'Plataformas educativas globales',
  //         'Intercambio cultural'
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'resolucion-problemas',
  //   name: 'Resolución Creativa de Problemas',
  //   category: 'innovative',
  //   description: 'Design Thinking para niños',
  //   progress: 50,
  //   content: [
  //     {
  //       title: 'Metodología',
  //       items: [
  //         'Design Thinking adaptado',
  //         'Creatividad aplicada',
  //         'Soluciones innovadoras'
  //       ]
  //     }
  //   ]
  // },

  // // 3. Metodología Futurista
  // {
  //   id: 'abp',
  //   name: 'Aprendizaje Basado en Proyectos (ABP)',
  //   category: 'innovative',
  //   description: 'Creación de mini-empresas escolares con impresión 3D',
  //   progress: 40,
  //   content: [
  //     {
  //       title: 'Implementación',
  //       items: [
  //         'Proyectos interdisciplinarios',
  //         'Modelos de negocio básicos',
  //         'Uso de impresión 3D'
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'realidad-virtual',
  //   name: 'Realidad Virtual (RV)',
  //   category: 'innovative',
  //   description: 'Excursiones virtuales a empresas tecnológicas globales',
  //   progress: 30,
  //   content: [
  //     {
  //       title: 'Experiencias',
  //       items: [
  //         'Tours virtuales educativos',
  //         'Simulaciones interactivas',
  //         'Realidad aumentada'
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'gamificacion',
  //   name: 'Gamificación',
  //   category: 'innovative',
  //   description: 'Uso de apps como Duolingo, Kahoot! y Minecraft Education',
  //   progress: 65,
  //   content: [
  //     {
  //       title: 'Herramientas',
  //       items: [
  //         'Plataformas gamificadas',
  //         'Aprendizaje basado en juegos',
  //         'Motivación educativa'
  //       ]
  //     }
  //   ]
  // }
];