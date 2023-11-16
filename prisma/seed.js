import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const luki = await prisma.user.upsert({
    where: { email: "hello@luki.my.id" },
    update: {},
    create: {
      name: "Luki Zainur Ismawan",
      userName: "luki",
      email: "hello@luki.my.id",
      Post: {
        create: [
          {
            content: "Anjas",
          },
          { content: "Makan aja" },
        ],
      },
    },
  });
  console.log(luki);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
