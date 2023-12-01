import { getInstance } from "./init.js";

export async function findSecurity<T extends { uid: number }>(params: T) {
  const { uid } = params;
  const passwordIns = getInstance('security')
  return passwordIns.findFirst({ where: { uid } })
}
