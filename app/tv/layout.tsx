
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '@/components/tv/sidebar';
import SidebarContainer from '@/components/tv/styledSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarContainer>
        <CssBaseline />
        <Box sx={{ display: 'flex', width: 'full', height: 'screen' }}>
          <Box sx={{ width: '15%' }}>
            <Sidebar />
          </Box>
          <Box sx={{ flexGrow: 1, width: '75%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'visible' }}>
              {children}
            </Box>
          </Box>
        </Box>
    </SidebarContainer>
  );
};

export default DashboardLayout;