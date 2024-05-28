"use client"

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Box
} from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Folder as FolderIcon, Settings as SettingsIcon, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
 const pathname = usePathname();
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/dashboard" passHref>
          <ListItem button component="a">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/dashboard/channel" passHref>
          <ListItem button component="a">
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Channel" />
          </ListItem>
        </Link>
        <Link href="/dashboard/program" passHref>
          <ListItem button component="a">
            <ListItemIcon><FolderIcon /></ListItemIcon>
            <ListItemText primary="Program" />
          </ListItem>
        </Link>
     </List>
    </Box>
  );

  return (
    <Box  sx={{width:'100%',}} padding={-1} >
      <AppBar sx={{background:'#0b0b1d'}} position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, }}
          >
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft:'30px' }}>
            {pathname}
          </Typography>
          <IconButton color="inherit">
            <Brightness4 />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer> */}
      <main>
        {children}
      </main>
    </Box>
  );
}
