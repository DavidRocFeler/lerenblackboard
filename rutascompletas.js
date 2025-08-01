// ruta base 
// Rutas principales
router.get('/schools', admin1Auth, getAllSchoolsController);
router.get('/schools/:id', admin1Auth, getSchoolByIdControler);
router.put('/schools/:id', admin1Auth, updateSchoolController);
router.post('/schools', admin1Auth, createSchoolController);
router.delete('/schools/:id', admin1Auth, deleteSchoolController);

// Rutas de administración (admin1 y admin2)
router.get('/schools/:schoolId/calendar', admin1Or2Auth, getSchoolCalendar);
router.put('/schools/:schoolId/calendar', admin1Or2Auth, updateSchoolCalendar);
router.post('/schools/:schoolId/calendar/events', admin1Or2Auth, addCalendarEvent);

// Rutas para profesores (admin2)
router.get('/schools/:schoolId/teachers', admin1Or2Auth, getAllTeachers);
router.post('/schools/:schoolId/teachers', admin1Or2Auth, addTeacher);
router.put('/schools/:schoolId/teachers/:teacherId', admin1Or2Auth, updateTeacher);
router.delete('/schools/:schoolId/teachers/:teacherId', admin1Or2Auth, deleteTeacher);

// Rutas de niveles (solo admin1)
router.get('/schools/:schoolId/levels', admin1Auth, getAllLevels);
router.post('/schools/:schoolId/levels', admin1Auth, createLevel);
router.put('/schools/:schoolId/levels/:levelId', admin1Auth, updateLevel);
router.delete('/schools/:schoolId/levels/:levelId', admin1Auth, deleteLevel);

// Rutas de grados (admin1 y admin3)
router.get('/schools/:schoolId/levels/:levelId/grades', admin1Or3Auth, getGradesByLevel);
router.post('/schools/:schoolId/levels/:levelId/grades', admin1Auth, createGrade);
router.put('/schools/:schoolId/levels/:levelId/grades/:gradeId', admin1Auth, updateGrade);
router.delete('/schools/:schoolId/levels/:levelId/grades/:gradeId', admin1Auth, deleteGrade);

// Rutas de secciones (admin1, admin3 y admin4)
router.get('/schools/:schoolId/levels/:levelId/grades/:gradeId/sections', admin1Or3Or4Auth, getSectionsByGrade);
router.post('/schools/:schoolId/levels/:levelId/grades/:gradeId/sections', admin1Or3Auth, createSection);
router.put('/schools/:schoolId/levels/:levelId/grades/:gradeId/sections/:sectionId', admin1Or3Auth, updateSection);
router.delete('/schools/:schoolId/levels/:levelId/grades/:gradeId/sections/:sectionId', admin1Or3Auth, deleteSection);

//rutas y cursos admin3 plan de estudio 
// Rutas de cursos por grado
router.get('/schools/:schoolId/grades/:gradeId/courses', admin1Or3Auth, getGradeCourses);
router.post('/schools/:schoolId/grades/:gradeId/courses', admin1Or3Auth, addCourse);
router.put('/schools/:schoolId/courses/:courseId', admin1Or3Auth, updateCourse);
router.delete('/schools/:schoolId/courses/:courseId', admin1Or3Auth, deleteCourse);

// Rutas de syllabus/plan de estudios
router.get('/schools/:schoolId/courses/:courseId/syllabus', admin1Or3Auth, getCourseSyllabus);
router.put('/schools/:schoolId/courses/:courseId/syllabus', admin1Or3Auth, updateCourseSyllabus);
router.get('/schools/:schoolId/courses/:courseId/subjects', admin1Or3Auth, getCourseSubjects);
router.post('/schools/:schoolId/courses/:courseId/subjects', admin1Or3Auth, addSubject);
router.put('/schools/:schoolId/subjects/:subjectId', admin1Or3Auth, updateSubject);
router.delete('/schools/:schoolId/subjects/:subjectId', admin1Or3Auth, deleteSubject);

// Rutas de clases
router.get('/schools/:schoolId/subjects/:subjectId/classes', admin1Or3Auth, getSubjectClasses);
router.post('/schools/:schoolId/subjects/:subjectId/classes', admin1Or3Auth, addClass);
router.put('/schools/:schoolId/classes/:classId', admin1Or3Auth, updateClass);
router.delete('/schools/:schoolId/classes/:classId', admin1Or3Auth, deleteClass);

// rutas para admin4
// Rutas de estudiantes
router.get('/schools/:schoolId/sections/:sectionId/students', admin1Or4Auth, getStudentsBySection);
router.post('/schools/:schoolId/sections/:sectionId/students', admin1Or4Auth, addStudent);
router.get('/schools/:schoolId/students/:studentId', admin1Or4Auth, getStudentById);
router.put('/schools/:schoolId/students/:studentId', admin1Or4Auth, updateStudent);
router.delete('/schools/:schoolId/students/:studentId', admin1Or4Auth, deleteStudent);

// Rutas de pagos
router.get('/schools/:schoolId/students/:studentId/payments', admin1Or4Auth, getStudentPayments);
router.post('/schools/:schoolId/students/:studentId/payments', admin1Or4Auth, createPayment);
router.put('/schools/:schoolId/payments/:paymentId', admin1Or4Auth, updatePayment);
router.delete('/schools/:schoolId/payments/:paymentId', admin1Or4Auth, deletePayment);
router.get('/schools/:schoolId/students/:studentId/payment-history', admin1Or4Auth, getPaymentHistory);
router.get('/schools/:schoolId/students/:studentId/receipts', admin1Or4Auth, getStudentReceipts);

// Rutas de auxiliares
router.get('/schools/:schoolId/sections/:sectionId/assistants', admin1Or4Auth, getSectionAssistants);
router.post('/schools/:schoolId/sections/:sectionId/assistants', admin1Or4Auth, addAssistant);
router.put('/schools/:schoolId/assistants/:assistantId', admin1Or4Auth, updateAssistant);
router.delete('/schools/:schoolId/assistants/:assistantId', admin1Or4Auth, deleteAssistant);

// Rutas del comité
router.get('/schools/:schoolId/sections/:sectionId/committee', admin1Or4Auth, getSectionCommittee);
router.post('/schools/:schoolId/sections/:sectionId/committee', admin1Or4Auth, addCommitteeMember);
router.put('/schools/:schoolId/committee/:memberId', admin1Or4Auth, updateCommitteeMember);
router.delete('/schools/:schoolId/committee/:memberId', admin1Or4Auth, deleteCommitteeMember);

// Rutas de reportes
router.get('/schools/:schoolId/sections/:sectionId/reports', admin1Or4Auth, getSectionReports);
router.post('/schools/:schoolId/sections/:sectionId/reports', admin1Or4Auth, createReport);
router.get('/schools/:schoolId/reports/:reportId', admin1Or4Auth, getReportById);
router.put('/schools/:schoolId/reports/:reportId', admin1Or4Auth, updateReport);
router.delete('/schools/:schoolId/reports/:reportId', admin1Or4Auth, deleteReport);

// Rutas del cuaderno de notas (gradeBook)
router.get('/schools/:schoolId/students/:studentId/gradebook', admin1Or4Auth, getStudentGradeBook);
router.put('/schools/:schoolId/students/:studentId/gradebook', admin1Or4Auth, updateStudentGradeBook);
router.get('/schools/:schoolId/students/:studentId/attendance', admin1Or4Auth, getStudentAttendance);
router.put('/schools/:schoolId/students/:studentId/attendance', admin1Or4Auth, updateStudentAttendance);


const studentData = [
    {
      id: 1,
      firstName: "Valentina",
      lastName: "A.",
      email: "valentina@lerenblackboard.com",
      password: "Leren123!",
      phone: "999888777",
      parentName: "María González",
      parentPhone: "111222333",
      parentEmail: "maria@example.com",
      level: "Primaria",
      section: "A",
      isActive: true,
      birthdate: "2010-05-15",
      studentCode: "STU-001",
      picture: "valentina.jpg",
      balance: 100.50
    },
    {
      id: 2,
      firstName: "Eva Juliet",
      lastName: "Palomino Alva",
      email: "eva@lerenblackboard.com",
      password: "Leren123!",
      phone: "555555555",
      parentName: "Madre de Eva",
      parentPhone: "444444444",
      parentEmail: "madre_eva@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-05-15",
      studentCode: "ST002",
      picture: "url_imagen_eva",
      balance: 75.00,
    },
    {
      id: 3,
      firstName: "Alessca",
      lastName: "Mendoza",
      email: "alessca@lerenblackboard.com",
      password: "Leren123!",
      phone: "987654321",
      parentName: "Roberto Mendoza",
      parentPhone: "123456789",
      parentEmail: "roberto@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-07-22",
      studentCode: "STU-003",
      picture: "alessca.jpg",
      balance: 85.25
    },
    {
      id: 4,
      firstName: "Rafaella",
      lastName: "Ramírez",
      email: "rafaella@lerenblackboard.com",
      password: "Leren123!",
      phone: "987123654",
      parentName: "Carlos Ramírez",
      parentPhone: "321654987",
      parentEmail: "carlos@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-03-10",
      studentCode: "STU-004",
      picture: "rafaella.jpg",
      balance: 90.00
    },
    {
      id: 5,
      firstName: "Denzel",
      lastName: "Smith",
      email: "denzel@lerenblackboard.com",
      password: "Leren123!",
      phone: "963852741",
      parentName: "Laura Smith",
      parentPhone: "741852963",
      parentEmail: "laura@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-08-05",
      studentCode: "STU-005",
      picture: "denzel.jpg",
      balance: 110.75
    },
    {
      id: 6,
      firstName: "Austin",
      lastName: "Johnson",
      email: "austin@lerenblackboard.com",
      password: "Leren123!",
      phone: "951753852",
      parentName: "Michael Johnson",
      parentPhone: "357159456",
      parentEmail: "michael@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-11-18",
      studentCode: "STU-006",
      picture: "austin.jpg",
      balance: 65.50
    },
    {
      id: 7,
      firstName: "Mateo",
      lastName: "López",
      email: "mateo@lerenblackboard.com",
      password: "Leren123!",
      phone: "852963741",
      parentName: "Ana López",
      parentPhone: "456123789",
      parentEmail: "ana@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-04-30",
      studentCode: "STU-007",
      picture: "mateo.jpg",
      balance: 120.00
    },
    {
      id: 8,
      firstName: "Anthuan",
      lastName: "Martínez",
      email: "anthuan@lerenblackboard.com",
      password: "Leren123!",
      phone: "753159486",
      parentName: "Pedro Martínez",
      parentPhone: "486753159",
      parentEmail: "pedro@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-09-12",
      studentCode: "STU-008",
      picture: "anthuan.jpg",
      balance: 95.25
    },
    {
      id: 9,
      firstName: "Dominic",
      lastName: "Rodríguez",
      email: "dominic@lerenblackboard.com",
      password: "Leren123!",
      phone: "654987321",
      parentName: "Sofía Rodríguez",
      parentPhone: "321987654",
      parentEmail: "sofia@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-06-25",
      studentCode: "STU-009",
      picture: "dominic.jpg",
      balance: 80.00
    },
    {
      id: 10,
      firstName: "Alex",
      lastName: "Pérez",
      email: "alex@lerenblackboard.com",
      password: "Leren123!",
      phone: "369258147",
      parentName: "Juan Pérez",
      parentPhone: "147258369",
      parentEmail: "juan@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-02-14",
      studentCode: "STU-010",
      picture: "alex.jpg",
      balance: 105.75
    },
    {
      id: 11,
      firstName: "Alessandro",
      lastName: "Fernández",
      email: "alessandro@lerenblackboard.com",
      password: "Leren123!",
      phone: "258147369",
      parentName: "Luisa Fernández",
      parentPhone: "369147258",
      parentEmail: "luisa@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-10-08",
      studentCode: "STU-011",
      picture: "alessandro.jpg",
      balance: 70.50
    },
    {
      id: 12,
      firstName: "Enzo",
      lastName: "Gómez",
      email: "enzo@lerenblackboard.com",
      password: "Leren123!",
      phone: "147369258",
      parentName: "Ricardo Gómez",
      parentPhone: "258369147",
      parentEmail: "ricardo@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-12-03",
      studentCode: "STU-012",
      picture: "enzo.jpg",
      balance: 115.00
    },
    {
      id: 13,
      firstName: "Luz Valentina",
      lastName: "Castro",
      email: "luzvalentina@lerenblackboard.com",
      password: "Leren123!",
      phone: "789456123",
      parentName: "Patricia Castro",
      parentPhone: "123456789",
      parentEmail: "patricia@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-01-20",
      studentCode: "STU-013",
      picture: "luzvalentina.jpg",
      balance: 88.75
    },
    {
      id: 14,
      firstName: "Bianca",
      lastName: "Silva",
      email: "bianca@lerenblackboard.com",
      password: "Leren123!",
      phone: "654321987",
      parentName: "Gabriel Silva",
      parentPhone: "987321654",
      parentEmail: "gabriel@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-07-07",
      studentCode: "STU-014",
      picture: "bianca.jpg",
      balance: 92.50
    },
    {
      id: 15,
      firstName: "Valeria",
      lastName: "Herrera",
      email: "valeria@lerenblackboard.com",
      password: "Leren123!",
      phone: "321654987",
      parentName: "Daniela Herrera",
      parentPhone: "987654321",
      parentEmail: "daniela@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-05-28",
      studentCode: "STU-015",
      picture: "valeria.jpg",
      balance: 78.25
    },
    {
      id: 16,
      firstName: "Thiago",
      lastName: "Díaz",
      email: "thiago@lerenblackboard.com",
      password: "Leren123!",
      phone: "951486273",
      parentName: "Fernando Díaz",
      parentPhone: "273486951",
      parentEmail: "fernando@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-09-15",
      studentCode: "STU-016",
      picture: "thiago.jpg",
      balance: 102.00
    },
    {
      id: 17,
      firstName: "Eva",
      lastName: "Rodríguez",
      email: "eva2@lerenblackboard.com",
      password: "Leren123!",
      phone: "852741963",
      parentName: "María Rodríguez",
      parentPhone: "963741852",
      parentEmail: "maria2@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-04-05",
      studentCode: "STU-017",
      picture: "eva2.jpg",
      balance: 87.50
    },
    {
      id: 18,
      firstName: "Angeles",
      lastName: "Sánchez",
      email: "angeles@lerenblackboard.com",
      password: "Leren123!",
      phone: "753951486",
      parentName: "José Sánchez",
      parentPhone: "486951753",
      parentEmail: "jose@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-11-22",
      studentCode: "STU-018",
      picture: "angeles.jpg",
      balance: 94.75
    },
    {
      id: 19,
      firstName: "Jhesta",
      lastName: "Vargas",
      email: "jhesta@lerenblackboard.com",
      password: "Leren123!",
      phone: "369147258",
      parentName: "Carmen Vargas",
      parentPhone: "258147369",
      parentEmail: "carmen@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-03-17",
      studentCode: "STU-019",
      picture: "jhesta.jpg",
      balance: 81.00
    },
    {
      id: 20,
      firstName: "Evelyn",
      lastName: "Ruiz",
      email: "evelyn@lerenblackboard.com",
      password: "Leren123!",
      phone: "147258369",
      parentName: "Alberto Ruiz",
      parentPhone: "369258147",
      parentEmail: "alberto@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-08-30",
      studentCode: "STU-020",
      picture: "evelyn.jpg",
      balance: 99.50
    },
    {
      id: 21,
      firstName: "Génesis",
      lastName: "Torres",
      email: "genesis@lerenblackboard.com",
      password: "Leren123!",
      phone: "258369147",
      parentName: "Rosa Torres",
      parentPhone: "147369258",
      parentEmail: "rosa@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-12-12",
      studentCode: "STU-021",
      picture: "genesis.jpg",
      balance: 76.25
    },
    {
      id: 22,
      firstName: "Jick",
      lastName: "Ortega",
      email: "jick@lerenblackboard.com",
      password: "Leren123!",
      phone: "369258147",
      parentName: "Manuel Ortega",
      parentPhone: "147258369",
      parentEmail: "manuel@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-02-28",
      studentCode: "STU-022",
      picture: "jick.jpg",
      balance: 108.00
    },
    {
      id: 23,
      firstName: "Valentina",
      lastName: "Molina",
      email: "valentinar@lerenblackboard.com",
      password: "Leren123!",
      phone: "147369258",
      parentName: "Andrea Molina",
      parentPhone: "258369147",
      parentEmail: "andrea@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-06-08",
      studentCode: "STU-023",
      picture: "valentinar.jpg",
      balance: 83.75
    },
    {
      id: 24,
      firstName: "Dylan",
      lastName: "Navarro",
      email: "dylan@lerenblackboard.com",
      password: "Leren123!",
      phone: "258147369",
      parentName: "Roberto Navarro",
      parentPhone: "369147258",
      parentEmail: "roberto2@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-10-15",
      studentCode: "STU-024",
      picture: "dylan.jpg",
      balance: 97.25
    },
    {
      id: 25,
      firstName: "Hyrum",
      lastName: "Jiménez",
      email: "hyrum@lerenblackboard.com",
      password: "Leren123!",
      phone: "369147258",
      parentName: "Silvia Jiménez",
      parentPhone: "258147369",
      parentEmail: "silvia@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-01-05",
      studentCode: "STU-025",
      picture: "hyrum.jpg",
      balance: 89.50
    },
    {
      id: 26,
      firstName: "Carlos",
      lastName: "Ríos",
      email: "carlos@lerenblackboard.com",
      password: "Leren123!",
      phone: "147258369",
      parentName: "Eduardo Ríos",
      parentPhone: "369258147",
      parentEmail: "eduardo@example.com",
      level: "Primaria",
      section: "G",
      isActive: true,
      birthdate: "2010-07-19",
      studentCode: "STU-026",
      picture: "carlos.jpg",
      balance: 104.75
    }
  ];