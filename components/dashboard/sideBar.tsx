'use client'
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';
import {
  Home as HomeIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  Person as UserIcon,
  Comment as MessageCircleIcon,
  Image as ImagePlayIcon,
  Category as ScalingIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';

const drawerWidth = 240;

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', px: 1, py: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <ForestOutlinedIcon    />
          </Box>
          <Typography variant="h6" noWrap component={Link} href="/">
            T-Movie
          </Typography>
        </Box>
        <List>
          <ListItem button component={Link} href="/dashboard" selected={pathname === "/dashboard"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} href="/dashboard/channel" selected={pathname === "/dashboard/posts"}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Channel" />
          </ListItem>
          <ListItem button component={Link} href="/dashboard/program" selected={pathname === "/dashboard/finance"}>
            <ListItemIcon>
              <ImagePlayIcon />
            </ListItemIcon>
            <ListItemText primary="Program" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
