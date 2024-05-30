import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SportsIcon from '@mui/icons-material/Sports';
import Link from 'next/link';

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

  const tabStyle = {
    border: '2px solid #2f2f5d',
    borderRadius: '8px',
    
    alignItems: 'center',
    justifyContent: 'center',
    width: '180px',
    mx: '4px',
    marginLeft: '14px',

    height: '220px',
    color: '#ffffff',
    backgroundColor: '#2f2f5d',
    display: 'flex',
    flexDirection: 'column'
  };

  const tabLabelStyle = {
    marginTop: '16px',
    fontSize: '14px',
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="media tabs"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Link href="/tv/live">
        <Box sx={tabStyle}>
          <LiveTvIcon fontSize="large" />
          <Typography sx={tabLabelStyle}>Live TV's</Typography>
          <Typography variant="body2">+5000 Channels</Typography>
        </Box>
        </Link>
        <Link href="/tv/movies">
        <Box sx={tabStyle}>
          <MovieIcon fontSize="large" />
          <Typography sx={tabLabelStyle}>Movies</Typography>
          <Typography variant="body2">+500 Movies</Typography>
        </Box>
        </Link>
        <Link href="/tv/tvshows">
        <Box sx={tabStyle}>
          <TvIcon fontSize="large" />
          <Typography sx={tabLabelStyle}>TV Shows</Typography>
          <Typography variant="body2">+900 Series</Typography>
        </Box>
        </Link>
        <Link href="/tv/sports">
        <Box sx={tabStyle}>
          <SportsIcon fontSize="large" />
          <Typography sx={tabLabelStyle}>Sports</Typography>
          <Typography variant="body2">+200 Channels</Typography>
        </Box>
        </Link>
      </Tabs>
    </Box>
  );
};

export default MediaTabs;