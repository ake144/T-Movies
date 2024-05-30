'use server'

import prisma from "@/lib/db"
import exp from "constants";



export async function createChannel(name:string) {
    try{
       const channel=  await prisma.channel.create({
            data:{
                name
            }
          })
          console.log('channel created:', channel);
          return channel;
    }
    catch(e){
  throw new Error('an Error creating channel')
    }
    
}

export async function fetchChannels(){
    try{
        const channels = await prisma.channel.findMany();
        console.log('channels fetched:', channels);
        return channels.map(channel => ({ ...channel, isActive: true }));;
    }
    catch(e){
        throw new Error('an Error fetching channels')
    }

}

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