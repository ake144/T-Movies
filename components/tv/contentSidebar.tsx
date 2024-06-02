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
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

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
  overflow: 'auto',
  scrollbarWidth: 'none',
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
  const selectedCategory = Number(searchParams.get('categoryId'))

  const handleChannelClick = (id: number) => {
    router.push(`?categoryId=${selectedCategory}&channelId=${id}&channelName=${channels.find((channel) => channel.id === id)?.name}`);
  };

  return (
    <SidebarContainer>
      <List>
        {channels.map((channel) => (
          <SelectedListItem
            key={channel.id}
            selected={selectedChannel === channel.id}
            onClick={() => handleChannelClick(channel.id)}
          >
            <ListItemIcon
              sx={{
                color: selectedChannel === channel.id ? '#ffffff' : '#a9a9c4',
                borderRadius: '50%',
                backgroundColor: selectedChannel === channel.id ? '#1f1f3d' : 'transparent',
                height: '70px',
                width: '70px',
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
