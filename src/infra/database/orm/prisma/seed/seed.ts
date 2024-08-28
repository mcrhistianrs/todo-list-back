import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createUser() {
  return await prisma.user.create({
    data: {
      email: 'fulano@email.com',
      name: 'Fulano',
      password: '$2b$10$AjOVXVM2tbJfWAFK/.gyLOBRbpaG0CfdZiz0hmjQ0pC/7ij2Dj3yG',
      createdAt: new Date(),
    },
  });
}

async function testDatabaseConnection() {
  const result = await prisma.$queryRaw`SELECT *  FROM User  ;`;
  console.log(result);
}

async function main() {
  console.log(await createUser());
  //await testDatabaseConnection();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
