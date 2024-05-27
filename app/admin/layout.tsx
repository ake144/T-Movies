import React from 'react';
import DashboardTopNav from  '@/components/dashboard/navBar'
import DashboardSideBar from "@/components/dashboard/sideBar";
import { Box, CssBaseline } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '280px 1fr' }, minHeight: '100vh', width: '100%' }}>
        <Box  sx={{width:'20%', 
          display: 'flex', flexDirection:'column',
        }}>
               <DashboardSideBar />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
          <DashboardTopNav>
            <Box component="main" sx={{ flex: 1, p: { xs: 2, lg: 3 }, gap: { xs: 2, lg: 3 }, display: 'flex', flexDirection: 'column', border: 1,marginTop:2, borderColor: 'divider' }}>
              {children}
            </Box>
          </DashboardTopNav>
        </Box>
      </Box>
    </>
  );
}
