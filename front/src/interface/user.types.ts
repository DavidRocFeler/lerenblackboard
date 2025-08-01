export interface IUserData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'superadmin' | 'student' | 'teacher' | 'director' | 'subdirector' | 'auxiliar_grade' | 'auxiliar';
    token: string;
    schoolId: number | null;
  }
  
export interface IAuthState {
    user: IUserData | null;
    studentDetails: any | null;
    setUser: (user: IUserData) => void;
    setStudentDetails: (details: any) => void;
    logout: () => void;
    initializeFromCookies: () => Promise<void>;
  }