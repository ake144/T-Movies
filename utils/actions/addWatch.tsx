'use server'

import prisma from '@/lib/db';
import { MovieSchema } from '../types';

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


export async function getWatchLaterMovies(userEmail: string) {
  try {
    const movies = await prisma.watchLater.findMany({
      where: {
        userEmail: userEmail,
      },
      select: {
        movie: true,
      },
    });
    return movies.map((entry) => entry.movie);
  } catch (error) {
    console.error('Error fetching watch later movies:', error);
    throw new Error('Error fetching watch later movies');
  }
}