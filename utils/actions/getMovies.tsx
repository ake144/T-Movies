import prisma from "@/lib/db";

export async function getMovies() {
    try {
        const movies = await prisma.movie.findMany();
        console.log("Movies fetched", movies);
        return movies;
    } catch (error) {
        console.error("Error fetching movies", error);
        throw new Error("Error fetching movies");
    }
    }
