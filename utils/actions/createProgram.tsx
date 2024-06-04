'use server'


import prisma from "@/lib/db"
import { MovieSchema } from "@/utils/types"



export async function createProgram(data:MovieSchema) {
  try{
    const program:MovieSchema = await prisma.movie.create({
        data:{
            title:data.title,
            duration : data.duration,
            description: data.description,
            channelId:data.channelId,
            typeId:data.typeId,
            categoryId: data.categoryId,
            videoUrl: data.videoUrl
        }
    })
    console.log("movies created", program)
  }
  catch(error){
    console.log("Error creating program", error)
    throw new Error("error creating program" )
  }
    
}

export async function fetchPrograms(query: {  page?: number, limit?: number, sortField?: string, sortOrder?: 'asc' | 'desc' }) {
    const { page = 1, limit = 10, sortField = 'title', sortOrder = 'asc' } = query;
    const offset = (page - 1) * limit;
    
    try{
    const programs = await prisma.movie.findMany({
     
        skip: offset,
        take: limit,
        orderBy: {
            [sortField]: sortOrder,
        },
    });
   const totalPrograms = await prisma.movie.count();

   const programsWithIsActive = programs.map(program => ({ ...program, isActive: true }));

       return{
              programs:programsWithIsActive,
              totalPrograms
         
       }
    }
    catch(e){
        throw new Error('an Error fetching programs')
    }

}

export async function deletePrograms(id:number){
    try{
        const program = await prisma.movie.delete({
            where:{
                id
            }
        })
        console.log("program deleted", program)
    }
    catch(error){
        console.log("Error deleting program", error)
        throw new Error("error deleting program")
    }

}

export async function updatePrograms(id:number, data:MovieSchema) {
    try{
        const program = await prisma.movie.update({
            where:{
                id:data.id
            },
            data:{
                title:data.title,
                duration : data.duration,
                description: data.description,
                channelId:data.channelId,
                typeId:data.typeId,
                categoryId: data.categoryId,
                videoUrl: data.videoUrl
            }
        })
        console.log("program updated", program)

    }
    catch(error){
        console.log("Error updating program", error)
        throw new Error("error updating program")
    }
  
}



export async function searchProgram(searchTerm: string) {
    try {
        const programs = await prisma.movie.findMany({
            where: {
                title: {
                    contains: searchTerm.toLowerCase(),
                },
                }
            })
        console.log("programs fetched", programs);
        }
    catch (error) {
        console.error("Error fetching programs", error);
        throw new Error("Error fetching programs");
    }
}



export async function getSport(channelId:number, typeId:number){
    try{
        const programs = await prisma.movie.findMany({
            where:{
                channelId,
                typeId
            }
        })
        console.log('programs fetched:', programs);
        return programs.map(program => ({ ...program, isActive: true }));;
    }
    catch(e){
        throw new Error('an Error fetching programs')
    }
}

export async function getLiveTv(channelId:number, typeId:number){
    try{
        const programs = await prisma.movie.findMany({
            where:{
                channelId,
                typeId
            }
        })
        console.log('programs fetched:', programs);
        return programs.map(program => ({ ...program, isActive: true }));;
    }
    catch(e){
        throw new Error('an Error fetching programs')
    }
}

export async function getTvShow(channelId:number, typeId:number){
    try{
        const programs = await prisma.movie.findMany({
            where:{
                channelId,
                typeId
            }
        })
        console.log('programs fetched:', programs);
        return programs.map(program => ({ ...program, isActive: true }));;
    }
    catch(e){
        throw new Error('an Error fetching programs')
    }
}