'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from './contentSidebar';
import MediaTabs from './bottomside';
import Header from './upperContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Theme } from '@mui/material/styles';

const Content = () => {
  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#14142b', color: '#ffffff' }}>
      <Grid container sx={{ flex: 1 }}>
        {!isSmallScreen && (
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Sidebar />
          </Grid>
        )}
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
            <Header />
            <>
              <Typography variant="h5">Transform Your Daylight Experience</Typography>

            </>
          </Box>
          <Box sx={{ marginTop: 'auto', padding: 2 }}>
            <MediaTabs />
          </Box>
          {isSmallScreen && (
            <Box sx={{ marginTop: 'auto', padding: 2 }}>
              <Sidebar />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
