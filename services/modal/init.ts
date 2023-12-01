import {PrismaClient} from '@prisma/client';

let prisma: PrismaClient | null = null;

type ModalName<T = keyof PrismaClient> = T extends T
  ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export function distoryPrismaInstance() {
  if (prisma) {
    prisma.$disconnect();
    prisma = null;
  }
}
