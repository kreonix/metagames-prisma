import { Prisma, PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  const heroes: Prisma.HeroCreateInput[] = [
    {
      name: 'Axe',
      game: {
        connectOrCreate: {
          where: { name: 'Dota 2' },
          create: { name: 'Dota 2' },
        },
      },
    },
    {
      name: 'Pudge',
      game: {
        connectOrCreate: {
          where: { name: 'Dota 2' },
          create: { name: 'Dota 2' },
        },
      },
    },
    {
      name: 'Invoker',
      game: {
        connectOrCreate: {
          where: { name: 'Dota 2' },
          create: { name: 'Dota 2' },
        },
      },
    },
  ];

  await Promise.all(
    heroes.map(
      async (hero) =>
        await prisma.hero.upsert({
          where: { name: hero.name },
          update: {},
          create: hero,
        }),
    ),
  );
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
