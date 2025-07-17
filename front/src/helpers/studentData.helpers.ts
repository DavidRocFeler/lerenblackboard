import { IStudent } from "@/interface/types";

export const students: IStudent[] = [
  {
    id: 'student-1',
    name: 'Valentina A.',
    phone: '999888777',
    parentName: 'María Pérez',
    parentPhone: '999888666',
    parentEmail: 'mariaperez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-01-15',
    studentCode: '12344566CCSD2',
    picture: '/profile.jpg',
    balance: '120.50', // Saldo a favor
    pendingPayments: {
      data: [
        {
          id: 'payment-1',
          description: 'Mensualidad Enero',
          dueDate: '2023-01-05',
          amount: 150.00,
          status: 'pending',
          paymentType: 'mensualidad'
        },
        {
          id: 'payment-2',
          description: 'Materiales escolares',
          dueDate: '2023-01-10',
          amount: 75.50,
          status: 'pending',
          paymentType: 'materiales'
        }
      ]
    },
    countableBook: {
      payments: {
        data: [
          {
            id: 'pay-001',
            date: '15/03/2024',
            amount: 350.00,
            method: 'Transferencia',
            description: 'Matrícula Marzo 2024'
          },
          {
            id: 'pay-002',
            date: '10/03/2024',
            amount: 280.00,
            method: 'Efectivo',
            description: 'Mensualidad Comunicación'
          },
        ]
      },
      receipt: {
       data: [
        {
          id: 'rec-001',
          date: '15/03/2024',
          amount: 350.00,
          imageUrl: '/receipts/marzo-2024.jpg',
          description: 'Recibo de matrícula'
        },
       ]
      }
    },
    // Cuaderno de control vacío por ahora
    gradeBook: {
      studentInfo: {
        ie: "I.E. N° SOR ANA DE LOS ANGELES",
        studentName: 'María Pérez',
        teacher: "JESUS SALVADOR Liliana",
        level: 'Primaria',
        gradeSection: '2G',
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
          areaGrade: "G"
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
          areaGrade: "D"
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
    },
  },
  {
    id: 'student-2',
    name: 'Alessca',
    phone: '988777666',
    parentName: 'Roberto Mendoza',
    parentPhone: '988777555',
    parentEmail: 'roberto.m@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-03-22',
    studentCode: '12344567CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-3',
    name: 'Rafaella',
    phone: '977666555',
    parentName: 'Carlos Gutierrez',
    parentPhone: '977666444',
    parentEmail: 'c.gutierrez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-05-10',
    studentCode: '12344568CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-4',
    name: 'Denzel',
    phone: '966555444',
    parentName: 'Laura Smith',
    parentPhone: '966555333',
    parentEmail: 'laura.smith@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-07-18',
    studentCode: '12344569CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-5',
    name: 'Austin',
    phone: '955444333',
    parentName: 'David Johnson',
    parentPhone: '955444222',
    parentEmail: 'd.johnson@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-09-30',
    studentCode: '12344570CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-6',
    name: 'Mateo',
    phone: '944333222',
    parentName: 'Ana López',
    parentPhone: '944333111',
    parentEmail: 'ana.lopez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2015-11-05',
    studentCode: '12344571CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-7',
    name: 'Anthuan',
    phone: '933222111',
    parentName: 'Pedro Martínez',
    parentPhone: '933222000',
    parentEmail: 'p.martinez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-02-14',
    studentCode: '12344572CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-8',
    name: 'Dominic',
    phone: '922111000',
    parentName: 'Sofía Rodríguez',
    parentPhone: '922111999',
    parentEmail: 'sofia.r@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-04-25',
    studentCode: '12344573CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-9',
    name: 'Alex',
    phone: '911000999',
    parentName: 'Miguel García',
    parentPhone: '911000888',
    parentEmail: 'm.garcia@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-06-08',
    studentCode: '12344574CCSD2',
    picture: '/dasd.jpg',
  },
  {
    id: 'student-10',
    name: 'Alessandro',
    phone: '900999888',
    parentName: 'Elena Vargas',
    parentPhone: '900999777',
    parentEmail: 'e.vargas@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-08-17',
    studentCode: '12344575CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-11',
    name: 'Enzo',
    phone: '989888777',
    parentName: 'Ricardo Fernández',
    parentPhone: '989888666',
    parentEmail: 'r.fernandez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-10-03',
    studentCode: '12344576CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-12',
    name: 'Luz Valentina',
    phone: '978777666',
    parentName: 'Carmen Ruiz',
    parentPhone: '978777555',
    parentEmail: 'c.ruiz@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2016-12-12',
    studentCode: '12344577CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-13',
    name: 'Bianca',
    phone: '967666555',
    parentName: 'Jorge Díaz',
    parentPhone: '967666444',
    parentEmail: 'j.diaz@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-01-20',
    studentCode: '12344578CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-14',
    name: 'Valeria',
    phone: '956555444',
    parentName: 'Patricia Morales',
    parentPhone: '956555333',
    parentEmail: 'p.morales@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-03-15',
    studentCode: '12344579CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-15',
    name: 'Thiago',
    phone: '945444333',
    parentName: 'Fernando Castro',
    parentPhone: '945444222',
    parentEmail: 'f.castro@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-05-22',
    studentCode: '12344580CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-16',
    name: 'Eva',
    phone: '934333222',
    parentName: 'Lucía Herrera',
    parentPhone: '934333111',
    parentEmail: 'l.herrera@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-07-30',
    studentCode: '12344581CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-17',
    name: 'Angeles',
    phone: '923222111',
    parentName: 'Hugo Silva',
    parentPhone: '923222000',
    parentEmail: 'h.silva@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-09-08',
    studentCode: '12344582CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-18',
    name: 'Jhesta',
    phone: '912111000',
    parentName: 'Adriana Mendoza',
    parentPhone: '912111999',
    parentEmail: 'a.mendoza@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2017-11-11',
    studentCode: '12344583CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-19',
    name: 'Evelyn',
    phone: '901000999',
    parentName: 'Raúl Torres',
    parentPhone: '901000888',
    parentEmail: 'r.torres@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-01-25',
    studentCode: '12344584CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-20',
    name: 'Génesis',
    phone: '990999888',
    parentName: 'Silvia Rojas',
    parentPhone: '990999777',
    parentEmail: 's.rojas@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-03-03',
    studentCode: '12344585CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-21',
    name: 'Jick',
    phone: '979888777',
    parentName: 'Oscar Fuentes',
    parentPhone: '979888666',
    parentEmail: 'o.fuentes@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-05-19',
    studentCode: '12344586CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-22',
    name: 'Valentina R.',
    phone: '968777666',
    parentName: 'Natalia Vega',
    parentPhone: '968777555',
    parentEmail: 'n.vega@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-07-07',
    studentCode: '12344587CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-23',
    name: 'Dylan',
    phone: '957666555',
    parentName: 'Arturo Peña',
    parentPhone: '957666444',
    parentEmail: 'a.pena@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-09-14',
    studentCode: '12344588CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-24',
    name: 'Hyrum',
    phone: '946555444',
    parentName: 'Verónica Soto',
    parentPhone: '946555333',
    parentEmail: 'v.soto@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2018-11-21',
    studentCode: '12344589CCSD2',
    picture: '/dasd.jpg'
  },
  {
    id: 'student-25',
    name: 'Carlos',
    phone: '935444333',
    parentName: 'Daniel Jiménez',
    parentPhone: '935444222',
    parentEmail: 'd.jimenez@example.com',
    level: 'Primaria',
    section: '2G',
    status: 'active',
    birthdate: '2019-01-30',
    studentCode: '12344590CCSD2',
    picture: '/dasd.jpg'
  }
];