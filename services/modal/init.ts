import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

type ModalName<T = keyof PrismaClient> = T extends T
  ?
    T extends `$${infer _r}`
    ? never
    : T
  : never;
export function getInstance<T extends ModalName>(
  modalName: T,
): PrismaClient[T] {
  if (prisma === null) {
    prisma = new PrismaClient();
  }
  return prisma[modalName];
}

export function destroyPrismaInstance() {
  if (prisma) {
    prisma.$disconnect();
    prisma = null;
  }
}
