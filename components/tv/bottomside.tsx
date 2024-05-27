// components/MediaTabs.js
import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SportsIcon from '@mui/icons-material/Sports';

const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const MediaTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <div>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"    
          aria-label="media tabs"
        >
          <Box   sx={{ border:'2px solid',alignItems:'center', justifyContent:'center',width:'150px',mx:'9px',marginLeft:'64px',height:'220px' }}>
             <Tab sx={{ backgroundColor: '#2f2f5d',justifyContent:'center'}} label="Live TV's" href='/tv/live' icon={<LiveTvIcon />} />
          </Box> 
          <Box   sx={{ border:'2px solid',alignItems:'center', justifyContent:'center',width:'150px',mx:'4px',marginLeft:'64px',height:'220px' }}>          <Tab label="Movies" href='/tv/movies' icon={<MovieIcon />} />
          </Box>
          <Box   sx={{ border:'2px solid',alignItems:'center', justifyContent:'center',width:'150px',mx:'4px',marginLeft:'64px',height:'220px' }}>          <Tab label="TV Shows" href='/tv/program' icon={<TvIcon />} />
          </Box>
          <Box   sx={{ border:'2px solid',alignItems:'center', justifyContent:'center',width:'150px',mx:'4px',marginLeft:'64px',height:'220px' }}>          <Tab label="Sports" href='/tv/sport' icon={<SportsIcon />} />
          </Box>
        </Tabs>
  
    </div>
  );
};

export default MediaTabs;
