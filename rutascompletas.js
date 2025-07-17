// ruta base 
// Rutas principales
router.get('/schools', admin1Auth, getAllSchools);
router.get('/schools/:id', admin1Auth, getSchoolById);
router.put('/schools/:id', admin1Auth, updateSchool);
router.post('/schools', admin1Auth, createSchool);
router.delete('/schools/:id', admin1Auth, deleteSchool);

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
