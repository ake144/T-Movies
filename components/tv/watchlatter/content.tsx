'use client'

import React, { useEffect, useState } from 'react'
import TvShowCard from './cards'
import Header from './navbar'
import { Grid, Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { getWatchLaterMovies } from '@/utils/actions/addWatch'
import { MovieSchema } from '@/utils/types'

function WatchLater() {
  const session = useSession()
  const user = session.data?.user
  const userEmail = user?.email || '' 
  const [Loading, setLoading] = useState(true)

  const [watchLater, setWatchLater] = useState<MovieSchema[]>([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await getWatchLaterMovies(userEmail)
        setWatchLater(results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMovies()
  }, [userEmail])

  return (
    <>
      <Box>
        <Box>
          <Header />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {Loading ? (
            <p>Loading...</p>
          ) : watchLater.length === 0 ? (
            <p>No movies found</p>
          ) : (
            watchLater.map((movie) => (
              <Grid key={movie.id} item>
                <TvShowCard movie={movie} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  )
}

export default WatchLater
