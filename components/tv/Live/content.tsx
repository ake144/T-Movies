'use client'

import React, { useEffect, useState } from 'react'
import LiveTvCard from './liveCard'
import Header from './navBar'
import { Grid, Paper,Box, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import {getLiveTv} from  '@/utils/actions/createProgram' 
import { MovieSchema } from '@/utils/types'
import MediaSkeleton from '@/components/skeleton'


function LiveTv() {
const [LiveTv,setLiveTv] = useState<MovieSchema[]>([])
const searchParams = useSearchParams()
const channelId = Number(searchParams.get('channelId'))
const typeId = Number(searchParams.get('typeId'))
const [loading, setLoading] = useState(true)


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const live =  await getLiveTv(channelId,typeId)
   setLiveTv(live)
    setLoading(false)
}
catch(error){
  console.log(error)
  setLoading(false)
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
                {loading ? (
                     <MediaSkeleton loading={true}/>
                ) : LiveTv.length === 0 ? (
                  <Typography variant='h3'  sx={{ width:'100%', marginTop:'140px', padding:'80px', justifyContent:'center', alignItems:'center'}}>
                  No Live Tv program found
                </Typography>
                ) : (
                    LiveTv.map((movie) => (
                    <Grid key={movie.id} item>        
                         <LiveTvCard movie={movie}/> 
                     </Grid>
                ))
                )}  
            </Grid>
        </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default LiveTv