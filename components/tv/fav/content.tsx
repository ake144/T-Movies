'use client'

import React, { useEffect, useState } from 'react'
import TvShowCard from './favCard'
import Header from './navBar'
import { Grid, Paper,Box } from '@mui/material'
import { MovieSchema } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { getFavorites } from '@/utils/actions/addFav'


function FavMovies() {
  
  const session = useSession()
  const user = session.data?.user
  const userEmail = user?.email || '' 

  const [favMovie, setFavMovie] = useState<MovieSchema[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const show = await getFavorites(userEmail);
        const movies = show.map((item) => item.movie); 
        setFavMovie(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [userEmail]);

  return (
  <>
  <Box>
    <Box  sx={{}}>
      <Header />
    </Box>
    <Grid sx={{ flexGrow: 1, paddingBottom:'30px' }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {favMovie.map((show) => (
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

export default FavMovies