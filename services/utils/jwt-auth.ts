import { randomUUID } from 'crypto';
import jwt, { type GetPublicKeyOrSecret, type Secret } from 'jsonwebtoken';
import { getConfig } from './config.js';
import { encodeAes } from './crypto.js';

export async function genSignaturesToken(data: {
  id: number;
  name: string;
  username: string;
}) {
  const payload = {
    uid: data.id,
    name: data.name,
    username: data.username,
  };
  const plain = randomUUID();
  const { refresh_expiresIn, token_expiresIn, secret } = getConfig();
  const [accessToken, refreshToken] = await Promise.all([
    jwt.sign({ ...payload, plain }, secret, {
      expiresIn: token_expiresIn || '3d',
    }),
    jwt.sign(payload, encodeAes(plain), {
      expiresIn: refresh_expiresIn || '7d',
    }),
  ]);
  return { accessToken, refreshToken };
}

export async function verifyToken(token: string, secret?: Secret | GetPublicKeyOrSecret) {
  secret = getConfig()?.secret || secret;
  return jwt.verify(token, secret!);
}


export async function decodeToken(token: string) {
  const { secret } = getConfig();
  return jwt.decode(token, secret);
}