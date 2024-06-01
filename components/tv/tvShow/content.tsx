'use client'

import React, { useEffect, useState } from 'react'
import TvShowCard from './tvshowCard'
import Header from './navBar'
import { Grid, Paper,Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import {getTvShow} from  '@/utils/actions/createProgram' 
import { MovieSchema } from '@/utils/types'


function TvShow() {
const [tvShow,setTvShow] = useState<MovieSchema[]>([])
const searchParams = useSearchParams()
const channelId = Number(searchParams.get('channelId'))
const typeId = Number(searchParams.get('typeId'))


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const show =  await getTvShow(channelId,typeId)
   setTvShow(show)
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
          {tvShow.map((show) => (
            <Grid key={show.id} item>        
               <TvShowCard   movie={show}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default TvShow