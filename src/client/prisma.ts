import { PrismaClient } from "prisma-client";
import Setting from "../common/setting.ts";

const prisma = new PrismaClient({
  datasourceUrl: Setting.DATABASE_URL,
});
await prisma.$queryRaw`SELECT 1 + 1;`;
export default prisma;
