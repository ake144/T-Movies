'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Avatar, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import SearchPage from '@/components/tv/searchbar';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams()
  const selectedChannel = searchParams.get('channelId')
  const selectedName = searchParams.get('channelName')
  console.log('the channel is ', selectedChannel)

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
        <Typography variant='h4' sx={{ paddingTop: '-10px',marginTop: '3px', marginBottom: '5px',fontFamily:'italic',fontWeight:'bold' }}>
          {selectedName}  
        </Typography>
           <Box sx={{ display: 'flex',paddingTop: '-10px',top:'-1px',marginTop: '3px', marginBottom: '5px', alignItems: 'right', paddingLeft:'390px' }}>
           <WbSunnyIcon sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },marginRight: 0.5 }} />
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}>18°</Typography>
            <Typography
                  variant="body2"
                  sx={{ margin: '0 8px',display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}>
                  {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </Typography>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }}}> {new Date().toLocaleTimeString('en-US', { day: 'numeric', month: 'short', dayPeriod: 'short' })}</Typography>
            <IconButton onClick={handleOpen} sx={{ color: 'white', marginLeft: 2,paddingBottom:'3px' }}>
              <SearchIcon />
            </IconButton>
            <Link href='/profile'>
              <Avatar src="/path/to/user.jpg" sx={{ marginLeft: 2 }} />
            </Link>
          </Box>
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
