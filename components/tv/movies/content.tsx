'use client'

import React, { useEffect, useState } from 'react'
import HungerGameCard from './MovieCard'
import Header from './navbar'
import { Grid, Paper,Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import getMovies from  '@/utils/actions/fetchMovies' 
import { MovieSchema } from '@/utils/types'


function Movies() {
const [movies,setMovies] = useState<MovieSchema[]>([])
const searchParams = useSearchParams()
const channelId = Number(searchParams.get('channelId'))
const typeId = Number(searchParams.get('typeId'))


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const movies =  await getMovies(channelId,typeId)
   setMovies(movies)
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
          {movies.map((movie) => (
            <Grid key={movie.id} item>        
               <HungerGameCard   movie={movie}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default Movies