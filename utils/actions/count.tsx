'use server';

import prisma from "@/lib/db";

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

export async function programs() {
  try {
    const movieCount = await prisma.movie.findMany();
    console.log('Movie count:', movieCount.length);
    return movieCount.length;
  } catch (error) {
    console.error('Error on counting movies:', error);
    throw error;
  }
}

export async function channels() {
  try {
    const channelCount = await prisma.channel.findMany();
    console.log('Channel count:', channelCount.length);
    return channelCount.length;
  } catch (error) {
    console.error('Error on counting channels:', error);
    throw error;
  }
}