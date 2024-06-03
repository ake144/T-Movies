import React from 'react'
import { LoginPage }  from '@/components/auth/login-form'
import { Box, Typography } from '@mui/material';


function page() {
  return (
    <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="60%"
            height="100%"
            sx={{ paddingLeft: '17%' }}
          >
           
              <img src="/logo.png" alt="logo" width="150" height="100" />
           
            <Typography
              sx={{ fontFamily: 'sans', color: 'white' }}
              padding={2}
              variant="h3"
              gutterBottom
            >
              T-Movie
            </Typography>
          </Box>
          <Box width="100%">
            <LoginPage  />
          </Box>
        </Box>

    </div>
  )
}

export default page