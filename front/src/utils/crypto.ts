import CryptoJS from 'crypto-js';

export function encrypt(data: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decrypt(encryptedData: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}