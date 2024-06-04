'use client';

import React, { useEffect, useState } from 'react';
import TvShowCard from './cards';
import Header from './navbar';
import { Grid, Box,Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { getWatchLaterMovies } from '@/utils/actions/addWatch';
import { MovieSchema } from '@/utils/types';

import MediaSkeleton from '@/components/skeleton';

function WatchLater() {
  const session = useSession();
  const user = session.data?.user;
  const userEmail = user?.email || ''; 
  const [loading, setLoading] = useState(true);

  const [watchLater, setWatchLater] = useState<MovieSchema[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await getWatchLaterMovies(userEmail);
        setWatchLater(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [userEmail]);

  return (
    <>
      <Box>
        <Box>
          <Header />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <MediaSkeleton loading={loading} />
          ) : watchLater.length === 0 ? (
            <Typography variant='h3'  sx={{ width:'100%', marginTop:'140px', padding:'80px', justifyContent:'center', alignItems:'center'}}>
            No Watch Later found
          </Typography>
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
  );
}

export default WatchLater;
