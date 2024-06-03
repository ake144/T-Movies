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
    <Grid container wrap="nowrap" >
      {Array.from(new Array(4)).map((_, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 4, my: 5 , p: 2,margin:3}}>
          <Skeleton variant="rectangular" width={250} height={280} sx={{ background:'#757575'}} />
          <Box sx={{ pt: 0.5,  }}>
            <Skeleton sx={{ background:'#757575'}}/>
            <Skeleton width="60%" sx={{ background:'#757575'}} />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default MediaSkeleton;
