'use client';

import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import {
  Home as HomeIcon,
  LiveTv as LiveTvIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  Sports as SportsIcon,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';

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
  backgroundColor: '#14142b',
  overflow: 'hidden', // Hide overflow initially
  '&:hover': {
    overflow: 'auto', // Show overflow on hover
  },
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari, and Opera
  },
}));

const SelectedListItem = styled(ListItem)(({ theme, selected }) => ({
  '&:hover': {
    backgroundColor: '#2f2f5d',
  },
  marginBottom: '2px',
  transition: 'background-color 0.3s',
}));

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedChannel = Number(searchParams.get('channelId'));
  const selectedCategory = Number(searchParams.get('categoryId'));

  const handleChannelClick = (id: number) => {
    router.push(`?categoryId=${selectedCategory}&channelId=${id}&channelName=${channels.find((channel) => channel.id === id)?.name}`);
  };

  return (
    <SidebarContainer>
      <List
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            sm: 'row',
            md: 'column',
            lg: 'column',
            xl: 'column',
          },
          overflowX: {
            xs: 'auto',
            sm: 'auto',
            md: 'hidden',
            lg: 'hidden',
            xl: 'hidden',
          },
          overflowY: {
            xs: 'hidden',
            sm: 'hidden',
            md: 'auto',
            lg: 'auto',
            xl: 'auto',
          },
          padding: 0,
          width: '100%',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {channels.map((channel) => (
          <SelectedListItem
            key={channel.id}
            selected={selectedChannel === channel.id}
            onClick={() => handleChannelClick(channel.id)}
            sx={{
              flex: {
                xs: '0 0 auto',
                sm: '0 0 auto',
                md: 'unset',
              },
              width: {
                xs: '150px',
                sm: '150px',
                md: 'unset',
              },
              marginBottom: {
                xs: 0,
                sm: 0,
                md: '2px',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedChannel === channel.id ? '#ffffff' : '#a9a9c4',
                borderRadius: '50%',
                backgroundColor: selectedChannel === channel.id ? '#1f1f3d' : 'transparent',
                height: {
                  md: '70px',
                  sm: '40px',
                  xs: '40px',
                },
                width: {
                  md: '70px',
                  sm: '40px',
                  xs: '40px',
                },
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {channel.icon}
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ color: selectedChannel === channel.id ? '#ffffff' : '#a9a9c4' }}>{channel.name}</Typography>}
            />
          </SelectedListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
