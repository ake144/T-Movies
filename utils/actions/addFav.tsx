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



export async function addMovieToFavorites(userId: number, movieId: number) {
    try {
      const favoriteEntry = await prisma.favorites.create({
        data: {
          userId,
          movieId,
        },
      });
      console.log("Movie added to Favorites list", favoriteEntry);
      return favoriteEntry;
    } catch (error) {
      console.error('Error adding to Favorites', error);
      throw new Error("Error adding movie to Favorites");
    }
  }