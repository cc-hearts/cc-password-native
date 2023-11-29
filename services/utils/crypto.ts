import {createCipheriv, createDecipheriv, createHash} from 'crypto';

import {getConfig} from './config.js';

export function strParseBuffer(str: string) {
  return Buffer.from(str, 'hex');
}

export function encodeMd5(str: string) {
  const md5 = createHash('md5');
  const encodeStr = md5.update(str);
  return encodeStr.digest('hex');
}

// aes 加密
export function encodeAes(plainText: string) {
  const {aes_key, aes_iv} = getConfig();
  // 创建加密器
  const cipher = createCipheriv(
    'aes-256-cbc',
    strParseBuffer(aes_key),
    strParseBuffer(aes_iv),
  );
  // 加密
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
export function decodeAes(encrypted: string) {
  const {aes_key, aes_iv} = getConfig();
  const decipher = createDecipheriv(
    'aes-256-cbc',
    strParseBuffer(aes_key),
    strParseBuffer(aes_iv),
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
