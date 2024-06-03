
'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from './contentSidebar';
import MediaTabs from './bottomside'; // Ensure this path is correct
import Header from './upperContent'
import { useSearchParams } from 'next/navigation';
 
const Content = () => {

  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#14142b', color: '#ffffff' }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Sidebar />
            </Grid>
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
            <Header />
            <>
              <Typography variant="h6" sx={{ color: '#ff5722', mb: 1 }}>🎬 Featured Movie</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Catch "The Godfather" Tonight!</Typography>

              <Typography variant="h6" sx={{ color: '#ff5722', mb: 1 }}>⚽ Upcoming Events</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>UEFA Champions League Final - Don't Miss It!</Typography>
            </>

          </Box>
          <Box sx={{ marginTop: 'auto', padding: 2 }}>
            <MediaTabs />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
