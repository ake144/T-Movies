// components/Content.js
'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar  from './contentSidebar';
import MediaTabs from './bottomside';


const Content = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
            <Typography variant="h4">Now Playing</Typography>
            <Typography variant="h6">Grey's Anatomy</Typography>
            <Typography variant="body1">
              Grey's Anatomy is an American medical drama television series that premiered on March 27, 2005, on ABC as a mid-season replacement.
            </Typography>
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
