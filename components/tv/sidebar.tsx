'use client';

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import {  useRouter, useSearchParams } from "next/navigation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Link from "next/link";
import { usePathname } from "next/navigation";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const tabs = [
  { label: "Live Watch", icon: <LiveTvIcon /> },
  { label: "Favourite", icon: <FavoriteIcon /> },
  { label: "Watch Later", icon: <AccessTimeIcon /> }
];

const DashboardSideBar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams()

const handleChange = (event: React.SyntheticEvent, id: number) => {
     router.push(`?categoryId=${id}`)    
};

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box p={3} marginTop="50px" marginBottom="70px" color='white' marginLeft='50px'>
        <Link href="/tv" passHref>
          <ArrowBackIosIcon style={{ fontWeight: 600, textDecoration: "none", color: "inherit" }} />
        </Link>
      </Box>
      <Tabs
        onChange={handleChange}
        orientation="vertical"
        sx={{ 
          padding:4,
          marginTop: '20px',
          gap:19,
          marginBottom: '20px',
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index}  sx={{color:'white'}} icon={tab.icon} />
        ))}
      </Tabs>
    </Box>
  );
};

export default DashboardSideBar;
