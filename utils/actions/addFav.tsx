import prisma from '@/lib/db';

interface MovieSchema {
  title: string;
  duration: number;
  description: string;
  channelId: number;
  typeId: number;
  categoryId: number;
  videoUrl: string;
}



export async function addMovieToFavorites( movieId: number, userEmail: string) {
    try {
      const favoriteEntry = await prisma.favorites.create({
        data: {
          movieId,
          userEmail 
        },
      });
      console.log("Movie added to Favorites list", favoriteEntry);
      return favoriteEntry;
    } catch (error) {
      console.error('Error adding to Favorites', error);
      throw new Error("Error adding movie to Favorites");
    }
  }

  export async function totalFavorites() {
    try {
      const favoriteCount = await prisma.favorites.findMany();
      return favoriteCount.length;
    } catch (error) {
      console.error('Error counting favorites', error);
      throw new Error("Error counting favorites");
    }
  }