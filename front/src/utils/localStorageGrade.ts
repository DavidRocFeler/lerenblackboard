// utils/localStorageGrade.ts
export const getSelectedGrade = (): string | null => {
  return localStorage.getItem('selectedGrade');
 };
 
 export const getSelectedLevel = (): string | null => {
  return localStorage.getItem('selectedLevel');
 };
 
 export const getSelectedSection = (): string | null => {
  return localStorage.getItem('selectedSection');
 };
 
 // Nueva función para transformar el grade
 export const getTransformedGrade = (): string | null => {
  const grade = localStorage.getItem('selectedGrade');
  const level = localStorage.getItem('selectedLevel');
  
  if (!grade || !level) return null;
  
  // Transformar "2do" + "Primaria" → "2_Primaria"
  const gradeNumber = grade.replace(/[^\d]/g, ''); // Extraer solo números
  return `${gradeNumber}_${level}`;
 };
 
 export const clearStudentSelection = (): void => {
  localStorage.removeItem('selectedGrade');
  localStorage.removeItem('selectedLevel');
  localStorage.removeItem('selectedSection');
 };