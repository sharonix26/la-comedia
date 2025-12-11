import * as PrismaPkg from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Some install/generate scenarios can cause TypeScript to not find a named
// `PrismaClient` export (generator output paths, ESM/CJS interop). Resolve
// a runtime constructor in a resilient way and fall back to `any` for types.
const PrismaClientCtor: typeof PrismaPkg.PrismaClient =
  (PrismaPkg as { PrismaClient?: typeof PrismaPkg.PrismaClient; default?: typeof PrismaPkg.PrismaClient }).PrismaClient ??
  (PrismaPkg as { default?: typeof PrismaPkg.PrismaClient }).default ??
  PrismaPkg.PrismaClient;

type PrismaClient = InstanceType<typeof PrismaClientCtor>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClientCtor({
    log: ["error"],
    adapter: new PrismaBetterSqlite3({ url: "file:./dev.db" }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
