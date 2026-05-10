import { PrismaClient } from '../../app/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const dbUrl = process.env.DATABASE_URL ?? 'file:./flip7.db';
    const filePath = dbUrl.replace(/^file:/, '');
    const adapter = new PrismaBetterSqlite3({ url: filePath });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
