'use server'

import prisma from "@/lib/db";

export async function updateChannel(id:number, name:string){
    try{
        const channel = await prisma.channel.update({
            where:{
                id
            },
            data:{
                name
            }
        })
        console.log("channel updated", channel)
    }
    catch(error){
        console.log("Error updating channel", error)
        throw new Error("error updating channel")
    }

}