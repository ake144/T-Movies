'use server'

import prisma from "@/lib/db"


async function getMovies(channelId: number,typeId: number){

        try{
                  const movies = prisma.movie.findMany({
                     where:{
                        typeId,
                        channelId,
                  }

                  })
                  return movies
        }
        catch(error){
            console.log('error while fetching movies')
            throw new Error('error error while fetching movies')

        }



}
export default getMovies;