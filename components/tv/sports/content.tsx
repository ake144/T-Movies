'use client'

import React, { useEffect, useState } from 'react'
import SportCard from './sportCard'
import Header from './navBar'
import { Grid, Paper,Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { getSport } from  '@/utils/actions/createProgram' 
import { MovieSchema } from '@/utils/types'


function Sports() {
const [sports,setSports] = useState<MovieSchema[]>([])
const searchParams = useSearchParams()
const channelId = Number(searchParams.get('channelId'))
const typeId = Number(searchParams.get('typeId'))


useEffect(()=>{
  const fetchMovies = async() =>{
 try{
  const sportData =  await getSport(channelId,typeId)
   setSports(sportData)
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
                {sports.map((sport) => (
                    <Grid key={sport.id} item>        
                         <SportCard movie={sport}/> 
                    </Grid>
                ))}
            </Grid>
        </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default Sports