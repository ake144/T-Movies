'use server'

import prisma from "@/lib/db";


export async function searchMovies(searchTerm: string) {
    try {
        const movies = await prisma.movie.findMany({
            where: {
                title: {
                    contains: searchTerm.toLowerCase(),
                },
                }
            })
        console.log("Movies fetched", movies);
        }

   catch (error) {
        console.error("Error fetching movies", error);
        throw new Error("Error fetching movies");
    }
}