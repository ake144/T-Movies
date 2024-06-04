'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Avatar, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import SearchPage from '@/components/tv/searchbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  scroll: 'vertical',
  Height: 600,  
  bgcolor: 'background.box',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Header = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ color: 'white', background: '#14142b', marginTop: '40px', marginBottom: '20px' }}>
        <Typography variant='h6' sx={{ paddingTop: '5px' }}>
        <IconButton sx={{ color: '#ff5722', marginRight: '8px',display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
              <Link href='/tv'>
                  <ArrowBackIosIcon />
              </Link>
          </IconButton>
         Sports
        </Typography>
        <Toolbar sx={{ justifyContent: 'space-between', marginTop: '2px', borderBottom: '0.2px solid' }}>
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
          <Box sx={{ display: 'flex', paddingBottom: '60px', alignItems: 'center' }}>
          <WbSunnyIcon sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },marginRight: 0.5 }} />
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}>18°</Typography>
            <Typography
                  variant="body2"
                  sx={{ margin: '0 8px',display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}>
                  {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </Typography>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}> {new Date().toLocaleTimeString('en-US', { day: 'numeric', month: 'short', dayPeriod: 'short' })}</Typography>            <IconButton onClick={handleOpen} sx={{ color: 'white', marginLeft: 2 }}>
              <SearchIcon />
            </IconButton>
            <Link href='/profile'>
              <Avatar src="/path/to/user.jpg" sx={{ marginLeft: 2 }} />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Typography id="child-modal-title" variant="h6" component="h2">
            Search for result
          </Typography>
          <Box id="child-modal-description" sx={{ mt: 2 }}>
            <SearchPage />
          </Box>
          <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
