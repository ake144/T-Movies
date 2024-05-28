'use client';

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { SessionProvider } from "next-auth/react";
import Sidebar from '@/components/tv/sidebar';
import { styled } from '@mui/material/styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NavContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0b0b1d',
  width: 'screen',
  height: 'screen',
  color: '#ffffff',
}));

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const session = null; // Declare the 'session' variable if you need authentication handling
  return (
    <NavContainer>
        <CssBaseline />
        <Box sx={{ display: 'flex', width: 'full', height: 'screen' }}>
          <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'visible' }}>
              {children}
            </Box>
          </Box>
        </Box>
    </NavContainer>
  );
};

export default DashboardLayout;