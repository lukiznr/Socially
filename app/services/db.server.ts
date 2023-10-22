import { PrismaClient } from "@prisma/client";
import { singleton } from "./singleton.server";

const db = singleton("prisma", () => new PrismaClient());
db.$connect();

export { db };

type User = {
  name: string;
  email: string;
  username: string;
};
export async function findOrCreateUser(user: User) {
  return await db.user.upsert({
    where: {
      email: user.email,
    },
    update: {},
    create: {
      email: user.email,
      name: user.name,
      userName: user.username,
    },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({ where: { id: id } });
}

export async function getPosts() {
  return await db.posts.findMany();
}
export async function getPost(id: string) {
  return await db.posts.findUnique({
    where: { id: id },
    include: { author: true },
  });
}
