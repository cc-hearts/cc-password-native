import {getInstance} from './init.js';

interface UserLogin {
  username: string;
  password: string;
}
export async function userLogin<T extends UserLogin>(params: T) {
  const {username, password} = params;
  const userModal = getInstance('user');
  const user = await userModal.findFirst({
    select: {
      username: true,
      password: true,
    },
    where: {
      username,
      password,
    },
  });
  return user;
}
