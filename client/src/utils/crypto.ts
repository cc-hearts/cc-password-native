import {hex_md5} from 'react-native-md5';
import CryptoJS from 'crypto-js';

export function encodeMd5(str: string) {
  return hex_md5(str);
}

export function decodeAes(encrypted: string, plain: string) {
  CryptoJS.AES.decrypt(encrypted, plain).toString();
}
