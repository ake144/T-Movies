// components/tv/Sidebar.js
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import {
  Home as HomeIcon,
  LiveTv as LiveTvIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  Sports as SportsIcon,
} from '@mui/icons-material';

const channels = [
  { id: 1, name: 'FOX TV', icon: <HomeIcon /> },
  { id: 2, name: 'ABC TV', icon: <LiveTvIcon /> },
  { id: 3, name: 'AMC TV', icon: <MovieIcon /> },
  { id: 4, name: 'NBC TV', icon: <TvIcon /> },
  { id: 5, name: 'HBO', icon: <LiveTvIcon /> },
  { id: 6, name: 'City TV', icon: <MovieIcon /> },
  { id: 7, name: 'ESPN', icon: <SportsIcon /> },
  { id: 8, name: 'Disney', icon: <TvIcon /> },
  { id: 9, name: 'CNN', icon: <LiveTvIcon /> },
];

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
}));

const SelectedListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#1f1f3d',
  '&:hover': {
    backgroundColor: '#2f2f5d',
  },
  paddingBottom:'15px'  // Add margin to create gap between list items
}));

const Sidebar = () => {
  const [selectedChannel, setSelectedChannel] = useState(channels[0].id);

  const handleChannelClick = (id: number) => {
    setSelectedChannel(id);
  };

  return (
    <SidebarContainer>
      <List sx={{ marginTop: '45px', marginBottom: '16px' }}>
        {channels.map((channel) => (
          <SelectedListItem
            key={channel.id}
            selected={selectedChannel === channel.id}
            onClick={() => handleChannelClick(channel.id)}
          >
            <ListItemIcon sx={{ color: selectedChannel === channel.id ? '#ffffff' : '#a9a9c4' }}>
              {channel.icon}
            </ListItemIcon>
            <ListItemText primary={<Typography sx={{ color: selectedChannel === channel.id ? '#ffffff' : '#a9a9c4' }}>{channel.name}</Typography>} />
          </SelectedListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
