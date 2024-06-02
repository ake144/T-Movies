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
const [Loading, setLoading] = useState(true)


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const show =  await getTvShow(channelId,typeId)
   setTvShow(show)
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
            {  Loading ? (
                <p>Loading...</p>
              ) : tvShow.length === 0 ? (
                <p>No movies found</p>
              ) : (
                tvShow.map((movie) => (
                  <Grid key={movie.id} item>        
                    <TvShowCard movie={movie}/>
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

export default TvShow