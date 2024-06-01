'use server'

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

export async function addMovieToWatchLater(movieId: number, userEmail: string) {
  try {
    const watchLaterEntry = await prisma.watchLater.create({
      data: {
        movieId,
        userEmail
      },
    });
    console.log("Movie added to Watch Later list", watchLaterEntry);
    return watchLaterEntry;
  } catch (error) {
    console.error('Error adding to Watch Later', error);
    throw new Error("Error adding movie to Watch Later");
  }
}


export async function totalWatchLatter(userEmail?: string) {
  try {
    const whereClause = userEmail ? { userEmail } : {};
    const favoriteCount = await prisma.watchLater.count({
      where: whereClause,
    });
    return favoriteCount;
  } catch (error) {
    console.error('Error counting favorites', error);
    throw new Error("Error counting favorites");
  }
}