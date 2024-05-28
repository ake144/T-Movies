'use client'


import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Header = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar  position="static" sx={{ color: 'white',background:'#0b0b1d',marginTop:'40px', marginBottom:'20px' }}>
       <Typography variant='h6' sx={{paddingTop:'5px'}}>
            Movies
        </Typography>
      <Toolbar sx={{ justifyContent: 'space-between', marginTop:'20px', borderBottom:'1px solid' }}>
        
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Recommended" />
          <Tab label="Popular" />
          <Tab label="Featured" />
        </Tabs>
        <Box sx={{ display: 'flex',paddingBottom:'60px', alignItems: 'center' }}>
          <WbSunnyIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2">18°</Typography>
          <Typography variant="body2" sx={{ margin: '0 8px' }}>
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </Typography>
          <Typography variant="body2"> {new Date().toLocaleTimeString('en-US',{day:'numeric',month:'short', dayPeriod:'short'})}</Typography>
          <IconButton sx={{ color: 'white', marginLeft: 2 }}>
            <SearchIcon />
          </IconButton>
          <Avatar src="/path/to/user.jpg" sx={{ marginLeft: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
