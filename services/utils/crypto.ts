import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { getConfig } from './config.js';


export function strParseBuffer(str: string) {
  return Buffer.from(str, 'hex');
}

export function encodeMd5(str: string) {
  const md5 = createHash('md5');
  const encodeStr = md5.update(str);
  return encodeStr.digest('hex');
}

export function encodeAes(plainText: string, aes_key?: string, aes_iv?: string) {
  const config = getConfig()
  aes_key = aes_key || config.aes_key
  aes_iv = aes_iv || config.aes_iv
  const cipher = createCipheriv(
    'aes-256-cbc',
    strParseBuffer(aes_key!),
    strParseBuffer(aes_iv!),
  );
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decodeAes(encrypted: string, aes_key?: string, aes_iv?: string) {
  const config = getConfig()
  aes_key = aes_key || config.aes_key
  aes_iv = aes_iv || config.aes_iv
  const decipher = createDecipheriv(
    'aes-256-cbc',
    strParseBuffer(aes_key!),
    strParseBuffer(aes_iv!),
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
