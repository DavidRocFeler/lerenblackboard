import { ISubSubject } from "@/interface/types";

export const communicationSubSubjects: ISubSubject[] = [
  {
    id: 'ortografia',
    name: 'Ortografía',
    description: 'Dominio de las reglas de escritura correcta',
    progress: 65,
    content: [
      {
        title: 'Habilidades principales',
        items: [
          'Uso correcto de mayúsculas',
          'Acentuación básica',
          'Signos de puntuación'
        ]
      },
      {
        title: 'Actividades',
        items: [
          'Dictados interactivos',
          'Corrección de textos',
          'Juegos de palabras'
        ]
      }
    ],
    classes: [
      {
        id: 'orto-01',
        title: 'Clase 1: El abecedario y las mayúsculas',
        description: 'Introducción al uso correcto de mayúsculas',
        content: 'Ejercicios prácticos con nombres propios y lugares geográficos. Identificación de errores comunes en textos cotidianos.',
        duration: 45,
        activity: 'Identificar mayúsculas en periódicos'
      },
      {
        id: 'orto-02',
        title: 'Clase 2: Acentuación de palabras agudas',
        description: 'Reglas básicas para palabras agudas',
        content: 'Ejemplos prácticos con vocabulario cotidiano. Ejercicios de clasificación.',
        duration: 50,
        activity: 'Caza del tesoro con palabras agudas'
      },
      {
        id: 'orto-03',
        title: 'Clase 3: Acentuación de graves y esdrújulas',
        description: 'Diferenciación entre graves y esdrújulas',
        content: 'Práctica con listas de palabras. Canciones mnemotécnicas.',
        duration: 50,
        activity: 'Crear tarjetas didácticas'
      },
      {
        id: 'orto-04',
        title: 'Clase 4: El punto y la coma',
        description: 'Uso básico de signos de puntuación',
        content: 'Análisis de textos con y sin puntuación. Reconstrucción de párrafos.',
        duration: 40,
        activity: 'Puntuación de historias cortas'
      },
      {
        id: 'orto-05',
        title: 'Clase 5: Signos de interrogación y exclamación',
        description: 'Uso emocional de signos',
        content: 'Dramatización de diálogos. Transformación de oraciones.',
        duration: 45,
        activity: 'Crear cómics con diálogos'
      },
      {
        id: 'orto-06',
        title: 'Clase 6: Homófonos básicos (hay/ahí)',
        description: 'Diferenciación de palabras que suenan igual',
        content: 'Juegos de asociación. Dictados especializados.',
        duration: 55,
        activity: 'Crear póster de homófonos'
      },
      {
        id: 'orto-07',
        title: 'Clase 7: Uso de la "H" muda',
        description: 'Reglas básicas de la H',
        content: 'Historias con palabras con H. Ejercicios de completar.',
        duration: 45,
        activity: 'Memorama de palabras con H'
      },
      {
        id: 'orto-08',
        title: 'Clase 8: Palabras con "B" y "V"',
        description: 'Diferenciación entre B y V',
        content: 'Reglas mnemotécnicas. Ejercicios de escritura guiada.',
        duration: 60,
        activity: 'Concurso de deletreo'
      },
      {
        id: 'orto-09',
        title: 'Clase 9: Evaluación de ortografía',
        description: 'Integración de conocimientos',
        content: 'Juego de estaciones con diferentes retos ortográficos.',
        duration: 60,
        activity: 'Olimpiada ortográfica'
      }
    ]
  },
  {
    id: 'lectura',
    name: 'Lectura',
    description: 'Desarrollo de comprensión lectora',
    progress: 58,
    content: [
      {
        title: 'Habilidades principales',
        items: [
          'Comprensión literal',
          'Inferencia básica',
          'Secuenciación de eventos'
        ]
      },
      {
        title: 'Actividades',
        items: [
          'Lectura guiada',
          'Club de lectura',
          'Dramatizaciones'
        ]
      }
    ],
    classes: [
      {
        id: 'lect-01',
        title: 'Clase 1: Elementos de un cuento',
        description: 'Identificación de personajes y escenarios',
        content: 'Análisis de cuentos cortos. Dibujo de personajes principales.',
        duration: 45,
        activity: 'Crear ficha de personaje'
      },
      {
        id: 'lect-02',
        title: 'Clase 2: Idea principal',
        description: 'Extracción de la idea central',
        content: 'Ejercicios con párrafos cortos. Subrayado de ideas clave.',
        duration: 50,
        activity: 'Resumen con emojis'
      },
      {
        id: 'lect-03',
        title: 'Clase 3: Secuencia de eventos',
        description: 'Orden cronológico en historias',
        content: 'Reordenamiento de viñetas. Linea de tiempo narrativa.',
        duration: 50,
        activity: 'Storyboard de cuentos'
      },
      {
        id: 'lect-04',
        title: 'Clase 4: Predicción de finales',
        description: 'Anticipación lógica',
        content: 'Lectura de cuentos cortados. Escritura de finales alternativos.',
        duration: 55,
        activity: 'Crear tu propio final'
      },
      {
        id: 'lect-05',
        title: 'Clase 5: Lectura expresiva',
        description: 'Uso de entonación adecuada',
        content: 'Práctica con diálogos. Grabación de lecturas.',
        duration: 45,
        activity: 'Radio teatro escolar'
      },
      {
        id: 'lect-06',
        title: 'Clase 6: Textos informativos',
        description: 'Estructura básica',
        content: 'Identificación de titulares y datos clave. Noticias escolares.',
        duration: 60,
        activity: 'Periódico mural'
      },
      {
        id: 'lect-07',
        title: 'Clase 7: Poesía infantil',
        description: 'Ritmo y rima',
        content: 'Lectura de poemas cortos. Identificación de rimas.',
        duration: 50,
        activity: 'Crear poema colectivo'
      },
      {
        id: 'lect-08',
        title: 'Clase 8: Instrucciones escritas',
        description: 'Seguimiento de pasos',
        content: 'Recetas simples. Manualidades con instrucciones.',
        duration: 55,
        activity: 'Seguir receta de cocina'
      },
      {
        id: 'lect-09',
        title: 'Clase 9: Evaluación de lectura',
        description: 'Integración de habilidades',
        content: 'Estaciones de lectura con diferentes tipos de textos.',
        duration: 60,
        activity: 'Feria lectora'
      }
    ]
  },
  {
    id: 'gramatica',
    name: 'Gramática',
    description: 'Estructura básica del lenguaje',
    progress: 62,
    content: [
      {
        title: 'Habilidades principales',
        items: [
          'Reconocimiento de sustantivos y verbos',
          'Concordancia básica',
          'Estructura oracional'
        ]
      },
      {
        title: 'Actividades',
        items: [
          'Juegos de clasificación',
          'Construcción de oraciones',
          'Corrección colectiva'
        ]
      }
    ],
    classes: [
      {
        id: 'gram-01',
        title: 'Clase 1: Sustantivos comunes/propios',
        description: 'Diferenciación básica',
        content: 'Clasificación de palabras. Búsqueda del tesoro en el aula.',
        duration: 45,
        activity: 'Mapa de sustantivos'
      },
      {
        id: 'gram-02',
        title: 'Clase 2: Verbos de acción',
        description: 'Identificación en oraciones',
        content: 'Juego de mímica verbal. Construcción de listas.',
        duration: 50,
        activity: 'Bingo de verbos'
      },
      {
        id: 'gram-03',
        title: 'Clase 3: Adjetivos calificativos',
        description: 'Uso descriptivo',
        content: 'Descripción de objetos. Juego de adivinanzas.',
        duration: 45,
        activity: 'Mistery box descriptiva'
      },
      {
        id: 'gram-04',
        title: 'Clase 4: Concordancia género/número',
        description: 'Reglas básicas',
        content: 'Ejercicios de corrección. Transformación de oraciones.',
        duration: 50,
        activity: 'Dominó gramatical'
      },
      {
        id: 'gram-05',
        title: 'Clase 5: Artículos definidos',
        description: 'Uso de el/la/los/las',
        content: 'Completar oraciones. Asociación con imágenes.',
        duration: 40,
        activity: 'Memorama de artículos'
      },
      {
        id: 'gram-06',
        title: 'Clase 6: Pronombres personales',
        description: 'Yo, tú, él/ella',
        content: 'Reemplazo en oraciones. Tarjetas ilustrativas.',
        duration: 45,
        activity: 'Teatro de pronombres'
      },
      {
        id: 'gram-07',
        title: 'Clase 7: Oraciones simples',
        description: 'Sujeto + predicado',
        content: 'Análisis de estructura. Juego de construir oraciones.',
        duration: 55,
        activity: 'Lotería oracional'
      },
      {
        id: 'gram-08',
        title: 'Clase 8: Sinónimos y antónimos',
        description: 'Ampliación de vocabulario',
        content: 'Juegos de asociación. Cadena de sinónimos.',
        duration: 50,
        activity: 'Torre de sinónimos'
      },
      {
        id: 'gram-09',
        title: 'Clase 9: Evaluación gramatical',
        description: 'Integración de conceptos',
        content: 'Juego de estaciones gramaticales con diferentes retos.',
        duration: 60,
        activity: 'Gymkana gramatical'
      }
    ]
  },
  {
    id: 'expresion-oral',
    name: 'Expresión Oral',
    description: 'Comunicación verbal efectiva',
    progress: 70,
    content: [
      {
        title: 'Habilidades principales',
        items: [
          'Fluidez verbal',
          'Vocabulario adecuado',
          'Lenguaje no verbal'
        ]
      },
      {
        title: 'Actividades',
        items: [
          'Juegos de roles',
          'Presentaciones cortas',
          'Debates guiados'
        ]
      }
    ],
    classes: [
      {
        id: 'oral-01',
        title: 'Clase 1: Presentaciones personales',
        description: 'Estructura básica',
        content: 'Modelado y práctica. Uso de tarjetas visuales.',
        duration: 45,
        activity: 'Presentación con objeto especial'
      },
      {
        id: 'oral-02',
        title: 'Clase 2: Descripción de imágenes',
        description: 'Uso de vocabulario descriptivo',
        content: 'Ejercicios con láminas. Juego de adivinanzas.',
        duration: 50,
        activity: 'Describe y dibuja'
      },
      {
        id: 'oral-03',
        title: 'Clase 3: Narración de experiencias',
        description: 'Orden cronológico',
        content: 'Guión gráfico personal. Técnicas de inicio-desarrollo-final.',
        duration: 55,
        activity: 'Show and tell'
      },
      {
        id: 'oral-04',
        title: 'Clase 4: Lenguaje no verbal',
        description: 'Gestos y posturas',
        content: 'Juegos de mímica. Reconocimiento de emociones.',
        duration: 45,
        activity: 'Charadas emocionales'
      },
      {
        id: 'oral-05',
        title: 'Clase 5: Instrucciones verbales',
        description: 'Claridad y precisión',
        content: 'Juego de "cómo llegar". Descripción de procesos simples.',
        duration: 50,
        activity: 'Construye siguiendo instrucciones'
      },
      {
        id: 'oral-06',
        title: 'Clase 6: Cuentacuentos',
        description: 'Técnicas básicas',
        content: 'Uso de voz y expresión corporal. Práctica con cuentos cortos.',
        duration: 60,
        activity: 'Hora del cuento'
      },
      {
        id: 'oral-07',
        title: 'Clase 7: Debate escolar',
        description: 'Opiniones fundamentadas',
        content: 'Temas simples como "Mejor mascota". Uso de turnos.',
        duration: 55,
        activity: 'Debate sobre juegos favoritos'
      },
      {
        id: 'oral-08',
        title: 'Clase 8: Entrevistas simples',
        description: 'Formulación de preguntas',
        content: 'Práctica en parejas. Entrevista a compañeros.',
        duration: 50,
        activity: 'Reporteros por un día'
      },
      {
        id: 'oral-09',
        title: 'Clase 9: Evaluación oral',
        description: 'Integración de habilidades',
        content: 'Presentaciones individuales y grupales con diferentes formatos.',
        duration: 60,
        activity: 'Festival de expresión oral'
      }
    ]
  }
];