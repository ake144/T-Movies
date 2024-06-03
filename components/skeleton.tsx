import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface MediaProps {
  loading: boolean;
}

function MediaSkeleton({ loading }: MediaProps) {
  if (!loading) return null;
  
  return (
    <Grid container wrap="nowrap">
      {Array.from(new Array(3)).map((_, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default MediaSkeleton;
