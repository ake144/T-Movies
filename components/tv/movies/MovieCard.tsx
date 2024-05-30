// components/HungerGameCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HungerGameCard = () => {
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
        image="/path/to/hunger-game.jpg"
        alt="The Hunger Game"
      />
      <CardContent sx={{ 
        p: 2,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.6)'
      }}>
        <Typography variant="body2" color="textSecondary" sx={{position: 'absolute', top: 10, right: 10}}>
          2h 22m
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="error" sx={{ backgroundColor: 'orange', padding: '2px 6px', borderRadius: 1 }}>
            New
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          The Hunger Game
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton sx={{ color: 'white' }}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <AccessTimeIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HungerGameCard;