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
  
  export const clearStudentSelection = (): void => {
    localStorage.removeItem('selectedGrade');
    localStorage.removeItem('selectedLevel');
    localStorage.removeItem('selectedSection');
  };