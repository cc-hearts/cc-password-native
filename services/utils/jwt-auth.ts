import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
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
  const {refresh_expiresIn, token_expiresIn, secret} = getConfig();
  const [accessToken, refreshToken] = await Promise.all([
    jwt.sign({...payload, plain}, secret, {
      expiresIn: token_expiresIn || '3d',
    }),
    jwt.sign(payload, encodeAes(plain), {
      expiresIn: refresh_expiresIn || '7d',
    }),
  ]);
  return {accessToken, refreshToken};
}

export function verifyToken(token: string) {
  const {secret} = getConfig();
  return jwt.verify(token, secret);
}
