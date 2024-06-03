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
  const createdChannels = await prisma.channel.createMany({ data: channels });
  const createdTypes = await prisma.type.createMany({ data: types });
  const createdCategories = await prisma.category.createMany({ data: categories });

  return { channels: createdChannels, types: createdTypes, categories: createdCategories };

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
