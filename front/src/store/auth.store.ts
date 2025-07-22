import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authCookies } from '@/lib/auth/cookies';

interface AuthState {
  user: {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'student';
    token: string;
  } | null;
  studentDetails: any | null;
  setUser: (user: any) => void;
  setStudentDetails: (details: any) => void;
  logout: () => void; // Ya no necesita ser async
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      studentDetails: null,
      setUser: (user) => {
        set({ user });
        // ✅ AGREGAR ESTA LÍNEA - Guardar en cookies
        if (user) {
          authCookies.set(user);
        }
      },
      setStudentDetails: (details) => set({ studentDetails: details }),
      logout: () => {
        set({ user: null, studentDetails: null });
        try {
          authCookies.clear();
        } catch (error) {
          console.error('Error clearing cookies:', error);
        }
        window.location.href = '/';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);