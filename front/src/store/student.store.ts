// stores/studentStore.ts
import { IStudentDetails } from '@/interface/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IStudentState {
  studentDetails: IStudentDetails | null;
  setStudentDetails: (details: IStudentDetails) => void;
  clearStudentDetails: () => void;
}

export const useStudentStore = create<IStudentState>()(
  persist(
    (set) => ({
      studentDetails: null,
      setStudentDetails: (details) => set({ studentDetails: details }),
      clearStudentDetails: () => set({ studentDetails: null }),
    }),
    {
      name: 'student_details',
      storage: createJSONStorage(() => localStorage),
    }
  )
);