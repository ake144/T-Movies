'use client'


import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieSchema, WatchLaterSchema } from '@/utils/types';
import Link from 'next/link';
import { addMovieToFavorites } from '@/utils/actions/addFav';
import { useSession } from 'next-auth/react';


const TvShowCard = ({ movie }: { movie: MovieSchema }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleAddToFavorites = async () => {
    try {
      await addMovieToFavorites(movie.id, user?.email ?? '');
    } catch (error) {
      console.error('Error adding movie to Favorites', error);
    }
  };

  return (
    <Card sx={{
      width: 250,
      bgcolor: 'black',
      color: 'white',
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <CardMedia
        component="img"
        height="350"
        image={movie.imageUrl || '/default-image.jpg'}
        alt={movie.title}
      />
      <CardContent sx={{
        p: 2,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.6)'
      }}>
         <Typography variant="body2" color="white" sx={{ position: 'absolute', top: -170, right: 10 }}>
         {`${Math.floor(movie.duration / 60000 / 60)}h ${Math.floor((movie.duration / 60000) % 60)}m`}      
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="error" sx={{ backgroundColor: 'orange', padding: '2px 6px', borderRadius: 1 }}>
            New
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton sx={{ color: 'white' }}>
            <Link href={movie.videoUrl}>
              <PlayArrowIcon />
            </Link>
          </IconButton>
          <IconButton onClick={handleAddToFavorites} sx={{ color: 'white' }}>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TvShowCard;
