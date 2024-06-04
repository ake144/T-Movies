'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface MediaProps {
  loading: boolean;
}

function MediaSkeleton({ loading }: MediaProps) {
  if (!loading) return null;

  // Define responsive breakpoints (adjust as needed)
  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536, // Adjust this if needed for larger screens
  };

  const [columns, setColumns] = React.useState(4); // Initial columns for large screens

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < breakpoints.sm) {
        setColumns(1); // Single column for extra small screens
      } else if (width < breakpoints.md) {
        setColumns(2); // Two columns for small screens
      } else {
        setColumns(4); // Four columns for medium and larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Grid container wrap="nowrap" spacing={3}>
      {Array.from(new Array(columns)).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Box sx={{ width: '100%', margin: '1rem auto', p: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={280} sx={{ background: '#616161' }} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton sx={{ background: '#757575' }} />
              <Skeleton width="60%" sx={{ background: '#757575' }} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default MediaSkeleton;
