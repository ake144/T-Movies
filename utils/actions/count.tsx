'use server';

import prisma from "@/lib/db";


interface CategoryCount {
  [key: string]: number;
}



export async function users() {
  try {
    const userCount = await prisma.user.findMany();
    console.log('User count:', userCount.length);
    return userCount.length;
  } catch (error) {
    console.error('Error on counting users:', error);
    throw error;
  }
}

// export async function programs() {
//   try {
//     const movieCount = await prisma.movie.findMany();
//     console.log('Movie count:', movieCount.length);
//     return movieCount.length;
//   } catch (error) {
//     console.error('Error on counting movies:', error);
//     throw error;
//   }
// }

// export async function channels() {
//   try {
//     const channelCount = await prisma.channel.findMany();
//     console.log('Channel count:', channelCount.length);
//     return channelCount.length;
//   } catch (error) {
//     console.error('Error on counting channels:', error);
//     throw error;
//   }
// }


export async function programs() {
  try {
    const typeCounts = await prisma.type.findMany({
      include: {
        _count: {
          select: { movie: true },
        },
      },
    });

    const counts: { [key: string]: number } = typeCounts.reduce((acc, type) => {
      acc[type.name] = type._count.movie;
      return acc;
    }, {} as { [key: string]: number }); 

    return counts;
  } catch (error) {
    console.error('Error on counting programs:', error);
    throw error;
  }
}



  export async function programCountWithCategory(): Promise<CategoryCount> {
    try {
      const categoryCounts = await prisma.category.findMany({
        include: {
          _count: {
            select: { movie: true },
          },
        },
      });
  
      const counts: CategoryCount = categoryCounts.reduce((acc: CategoryCount, category) => {
        acc[category.name] = category._count.movie;
        return acc;
      }, {});
  
      return counts;
    } catch (error) {
      console.error('Error on counting programs:', error);
      throw error;
    }
  }

export async function channels() {
  try {
    const channelCount = await prisma.channel.count();
    return channelCount;
  } catch (error) {
    console.error('Error on counting channels:', error);
    throw error;
  }
}


export async function programsCount() {
  try {
    const movieCount = await prisma.movie.count();
    console.log('Movie count:', movieCount);
    return movieCount;
  } catch (error) {
    console.error('Error on counting movies:', error);
    throw error;
  }
}



export const getMovieCountsByType = async () => {
  try {
    const movieCounts = await prisma.type.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { movie: true }, // This counts the related movies
        },
      },
    });

    return movieCounts.map(type => ({
      typeId: type.id,
      typeName: type.name,
      movieCount: type._count.movie,
    }));
  } catch (error) {
    console.error('Error fetching movie counts by type:', error);
    throw new Error('Could not fetch movie counts by type');
  }
};

export const watchLaterCount = async () => {
  try {
    const watchLaterCount = await prisma.watchLater.count();
    return watchLaterCount;
  } catch (error) {
    console.error('Error on counting watch later:', error);
    throw error;
  }
}

export const favoriteCount = async () => {
  try {
    const favoriteCount = await prisma.favorites.count();
    return favoriteCount;
    
  } catch (error) {
    console.error('Error on counting favorites:', error);
    throw error;
  }
}