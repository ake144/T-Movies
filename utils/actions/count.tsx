import prisma from "@/lib/db";

export async function users(){
   try{
    const userCount = await prisma.user.findMany()
   return userCount.length

   }
   catch(error){
   
  console.log('errror on counting users')
}
}


export async function programs(){
   try{
    const movieCount = await prisma.movie.findMany()

   return movieCount.length

   }
   catch(error){
   
  console.log('errror on counting movies')
}
}
export async function channels(){
   try{
    const channelCount = await prisma.channel.findMany()

   return channelCount.length

   }
   catch(error){
   
  console.log('errror on counting channels')
}
}