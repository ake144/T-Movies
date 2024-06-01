'use server'

import prisma from "@/lib/db";
import { MovieSchema } from "../types";


export async function searchMovies(searchTerm: string): Promise<MovieSchema[]> {
    try {
        // Check if the search term is empty and return an empty array if it is
        if (!searchTerm.trim()) {
            return [];
        }
        
        // Fetch movies that match the search term
        const movies = await prisma.movie.findMany({
            where: {
                title: {
                    contains: searchTerm.toLowerCase(),
                },
            },
        });

        console.log("Movies fetched", movies);
        
        // Return the fetched movies
        return movies;
    } catch (error) {
        console.error("Error fetching movies", error);
        throw new Error("Error fetching movies");
    }
}