import { getInstance } from './init.js';

interface UserLogin {
  username: string;
  password: string;
}

const selectFields = {
  id: true,
  name: true,
  username: true,
}

export async function findUser<T extends Omit<UserLogin, 'password'>>(
  params: T,
) {
  const userModal = getInstance('user');
  const { username } = params;
  return await userModal.findFirst({
    select: {
      username: true,
    },
    where: {
      username,
    },
  });
}

export async function findUserById(id: number) {
  const userModal = getInstance('user');
  return await userModal.findFirst({
    select: selectFields,
    where: {
      id,
    },
  });
}

export async function userLogin<T extends UserLogin>(params: T) {
  const { username, password } = params;
  const userModal = getInstance('user');
  const user = await userModal.findFirst({
    select: selectFields,
    where: {
      username,
      password,
    },
  });
  return user;
}