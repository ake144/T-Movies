import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '@/components/tv/sidebar';
import SidebarContainer from '@/components/tv/styledSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarContainer>
      <CssBaseline />
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <Box sx={{ width: { xs: '0%', sm: '0%', md: '15%', lg: '15%' }, display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: '100%', md: '85%', lg: '85%' }, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflow: 'visible' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarContainer>
  );
};

export default DashboardLayout;
