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

export async function fetchChannels(query: { searchTerm?: string, page?: number, limit?: number, sortField?: string, sortOrder?: 'asc' | 'desc' }) {
    const { searchTerm = '', page = 1, limit = 10, sortField = 'name', sortOrder = 'asc' } = query;
    const offset = (page - 1) * limit;

    try {
        const where = searchTerm ? {
            name: {
                contains: searchTerm.toLowerCase()
            }
        } : {};

        const channels = await prisma.channel.findMany({
            where,
            skip: offset,
            take: limit,
            orderBy: {
                [sortField]: sortOrder,
            },
        });

        const totalChannels = await prisma.channel.count({ where });


        const channelsWithIsActive = channels.map(channel => ({ ...channel, isActive: true }));


        return {
            channels:channelsWithIsActive,
            totalChannels
        };
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw new Error('An error occurred while fetching channels');
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

export async function searchChannel(name:string){
    try{
        const channel = await prisma.channel.findMany({
            where:{
                name:{
                    contains: name.toLowerCase()
                }
            }
        })
        console.log("channel searched", channel)
    }
    catch(error){
        console.log("Error searching channel", error)
        throw new Error("error searching channel")
    }

}