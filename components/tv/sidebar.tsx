'use client'

import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Link from "next/link";


const tabs = [
  { url:"/tv",   label: "Live Watch", icon: <LiveTvIcon /> },
  { url: "/tv/fav", label: "Favourite", icon: <FavoriteIcon /> },
  { url: "/tv/watchlater", label: "Watch Later", icon: <AccessTimeIcon /> },
];

const DashboardSideBar: React.FC = () => {
  const router = useRouter();

  const handleChange = (url: string) => {
    router.push(url);
  };

  const handleLiveWatchClick = () => {
   
    const categoryId = 0; 
    router.push(`/tv?categoryId=${categoryId}`);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box p={3} marginTop="50px" marginBottom="70px" color="white" marginLeft="50px">
        <Link href="/tv" passHref>
          <Typography  variant="h5" sx={{fontWeight:'bold'}}>
                 T-Movie
          </Typography>
        </Link>
      </Box>
      <Tabs
        orientation="vertical"
        sx={{
          padding: '20px',
          marginTop: "20px",
          alignItems: "space-between",
          marginBottom: "40px",
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            sx={{ color: "white" }}
            icon={tab.icon}
            onClick={() => {
              if (tab.label === "Live Watch") {
                handleLiveWatchClick();
              } else {
                handleChange(tab.url);
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default DashboardSideBar;
