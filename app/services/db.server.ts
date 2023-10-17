import { PrismaClient } from "@prisma/client";
import { singleton } from "./singleton.server";

const db = singleton("prisma", () => new PrismaClient());
db.$connect();

export { db };

export async function getUser(email: string) {
  return await db.user.findUnique({ where: { email: email } });
}
