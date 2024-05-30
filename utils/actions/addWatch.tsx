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

export async function addMovieToWatchLater(userId: number, movieId: number) {
  try {
    const watchLaterEntry = await prisma.watchLater.create({
      data: {
        userId,
        movieId,
      },
    });
    console.log("Movie added to Watch Later list", watchLaterEntry);
    return watchLaterEntry;
  } catch (error) {
    console.error('Error adding to Watch Later', error);
    throw new Error("Error adding movie to Watch Later");
  }
}