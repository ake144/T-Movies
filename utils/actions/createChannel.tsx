'use server'

import prisma from "@/lib/db"



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