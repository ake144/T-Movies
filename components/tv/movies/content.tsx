
import React from 'react'
import HungerGameCard from './MovieCard'
import Header from './navbar'
import { Grid, Paper,Box } from '@mui/material'

function Movies() {
  return (
  <>
  <Box>
    <Box  sx={{}}>
        <Header />
    </Box>
    <Grid sx={{ flexGrow: 1, paddingBottom:'30px' }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>        
               <HungerGameCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
     </Grid>
    </Box>
    </>
    )
}

export default Movies