'use client'

import React, { useEffect, useState } from 'react'
import LiveTvCard from './liveCard'
import Header from './navBar'
import { Grid, Paper,Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import {getLiveTv} from  '@/utils/actions/createProgram' 
import { MovieSchema } from '@/utils/types'


function LiveTv() {
const [LiveTv,setLiveTv] = useState<MovieSchema[]>([])
const searchParams = useSearchParams()
const channelId = Number(searchParams.get('channelId'))
const typeId = Number(searchParams.get('typeId'))


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const live =  await getLiveTv(channelId,typeId)
   setLiveTv(live)
}
catch(error){
  console.log(error)
}
  }
  fetchMovies()

},[channelId,typeId])

  return (
  <>
  <Box>
    <Box  sx={{}}>
      <Header />
    </Box>
    <Grid sx={{ flexGrow: 1, paddingBottom:'30px' }} container spacing={2}>
        <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
                {LiveTv.map((movie) => (
                    <Grid key={movie.id} item>        
                         <LiveTvCard movie={movie}/> 
                     </Grid>
                ))}
            </Grid>
        </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default LiveTv