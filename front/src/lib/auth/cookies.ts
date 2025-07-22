import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;

// Función de cifrado
const encrypt = (data: string): string => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return iv.toString() + ':' + encrypted.toString();
};

// Función de descifrado
const decrypt = (encryptedData: string): string => {
  const parts = encryptedData.split(':');
  const iv = CryptoJS.enc.Hex.parse(parts[0]);
  const encrypted = parts[1];
  return CryptoJS.AES.decrypt(encrypted, SECRET_KEY, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  }).toString(CryptoJS.enc.Utf8);
};

// Función helper para cookies del cliente
const getCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

const setCookie = (name: string, value: string, options: {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
} = {}) => {
  if (typeof window === 'undefined') return;
  
  let cookieString = `${name}=${value}`;
  
  if (options.maxAge) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }
  
  if (options.path) {
    cookieString += `; Path=${options.path}`;
  }
  
  if (options.secure) {
    cookieString += `; Secure`;
  }
  
  // Nota: httpOnly no se puede establecer desde JavaScript del cliente
  // Solo está disponible en cookies del servidor
  
  cookieString += `; SameSite=Strict`;
  
  document.cookie = cookieString;
};

const deleteCookie = (name: string, path: string = '/') => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
};

// Versión para cliente
export const authCookies = {
  set(user: { token: string; id: number; email: string; name: string; role: string }) {
    const encryptedToken = encrypt(user.token);
    
    setCookie('auth_token', encryptedToken, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    setCookie('user_data', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }), {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  },

  get() {
    const encryptedToken = getCookie('auth_token');
    
    if (!encryptedToken) return null;
    
    try {
      const token = decrypt(encryptedToken);
      const userData = getCookie('user_data');
      return userData ? { ...JSON.parse(userData), token } : null;
    } catch (error) {
      console.error('Error decrypting token:', error);
      return null;
    }
  },

  clear() {
    deleteCookie('auth_token');
    deleteCookie('user_data');
  }
};