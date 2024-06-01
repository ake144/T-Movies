'use server'

import prisma from "@/lib/db";

export async function deleteChannel(id:number){
    try{
        const channel = await prisma.channel.delete({
            where:{
                id
            }
        })
        console.log("channel deleted", channel)
    }
    catch(error){
        console.log("Error deleting channel", error)
        throw new Error("error deleting channel")
    }

}