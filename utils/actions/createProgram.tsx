'use server'


import prisma from "@/lib/db"

interface ProgramSchema {
    title     :  string
    duration  :  number
    description : string
    channelId  : number
    typeId    :  number
    categoryId : number
    videoUrl   : string
}


export async function createProgram(data:ProgramSchema) {
  try{
    const program:ProgramSchema = await prisma.movie.create({
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