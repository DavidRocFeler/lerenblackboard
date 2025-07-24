// utils/crypto.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY!; // Clave desde variables de entorno

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};