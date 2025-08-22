// stores/auth.store.ts
import { create } from 'zustand';
import { encryptData, decryptData } from '@/utils/crypto';
import { IAuthState } from '@/interface/user.types';

export const useAuthStore = create<IAuthState>((set, get) => ({
  user: null,
  studentDetails: null,

  setUser: (user) => {
    try {
      // console.log('[AuthStore] SetUser iniciado', { user: user.id });

      // 1. Validar datos de entrada
      if (!user?.token) throw new Error('Token no proporcionado');
      
      // 2. Encriptar token
      const encryptedToken = encryptData(user.token);
      // console.log('[AuthStore] Token encriptado con éxito');

      // 3. Preparar datos para cookies
      const cookieData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        cryptoToken: encryptedToken,
        timestamp: Date.now(), // Para debug
        schoolId: user.schoolId 
      };

      // 4. Guardar en Zustand (memoria)
      set({ user });
      // console.log('[AuthStore] Estado actualizado');

      // 5. Guardar en cookies (codificado para URL)
      const cookieValue = encodeURIComponent(JSON.stringify(cookieData));
      const isProduction = process.env.NODE_ENV === 'production';
      
      document.cookie = `auth_data=${cookieValue}; path=/; ${isProduction ? 'secure; ' : ''}samesite=lax; max-age=${60 * 60 * 24}`;
      
      // console.log('[AuthStore] Cookie creada:', {
      //   length: cookieValue.length,
      //   env: process.env.NODE_ENV,
      //   secure: isProduction
      // });

    } catch (error) {
      console.error('[AuthStore] Error en setUser:', error);
      throw error;
    }
  },

  setStudentDetails: (details) => {
    set({ studentDetails: details });
    // console.log('[AuthStore] Detalles de estudiante actualizados');
  },

  logout: () => {
    // Limpieza básica
    document.cookie = 'auth_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.clear();
    set({ user: null, studentDetails: null });
  
    // Redirección segura (para Next.js o React)
    if (typeof window !== 'undefined') {
      // Opción 1: Recarga completa (elimina cualquier estado residual)
      window.location.href = '/';
      
      // Opción 2: Usando el router (sin recargar la página)
      // import { useRouter } from 'next/router';
      // const router = useRouter();
      // router.push('/').then(() => router.reload());
    }
  },

  initializeFromCookies: async () => {
    // console.log('[AuthStore] Inicializando desde cookies');
    try {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_data='));

      if (!cookie) {
        // console.log('[AuthStore] No se encontró cookie auth_data');
        return;
      }

      const cookieValue = decodeURIComponent(cookie.split('=')[1]);
      const parsedData = JSON.parse(cookieValue);
      // console.log('[AuthStore] Cookie parseada', { id: parsedData.id });

      // Desencriptar token
      const decryptedToken = decryptData(parsedData.cryptoToken);
      // console.log('[AuthStore] Token desencriptado con éxito');

      set({
        user: {
          id: parsedData.id,
          email: parsedData.email,
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          role: parsedData.role,
          schoolId: parsedData.schoolId, 
          token: decryptedToken
        }
      });
      // console.log('[AuthStore] Estado cargado desde cookies');

    } catch (error) {
      // console.error('[AuthStore] Error al cargar cookies:', error);
      // Limpiar cookie corrupta
      document.cookie = 'auth_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}));