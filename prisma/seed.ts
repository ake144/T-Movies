const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {
  const channels = [
    { name: 'HBO' },
    { name: 'ABC TV' },
    { name: 'NBC TV' },
    { name: 'AMC TV' },
    { name: 'Disney' },
    { name: 'FOX' }
  ];

  const types = [
    { name: 'Live TV' },
    { name: 'Movies' },
    { name: 'TV Shows' },
    { name: 'Sports' }
  ];

  const categories = [
    { name: 'Recommended' },
    { name: 'Popular' },
    { name: 'Featured' },
    { name: 'Favorites' },
    { name: 'Watch Later' }
  ];

  await prisma.channel.createMany({ data: channels });
  await prisma.type.createMany({ data: types });
  await prisma.category.createMany({ data: categories });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
