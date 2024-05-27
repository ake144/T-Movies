'use client';

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import {  useRouter } from "next/navigation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Link from "next/link";
import { usePathname } from "next/navigation";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const tabs = [
  { href: "/LiveWatch", label: "Live Watch", icon: <LiveTvIcon /> },
  { href: "/favourite", label: "Favourite", icon: <FavoriteIcon /> },
  { href: "/watchLater", label: "Watch Later", icon: <AccessTimeIcon /> }
];

const DashboardSideBar: React.FC = () => {
  const pathname = usePathname();

const [value, setValue] = useState(() => {
    const index = tabs.findIndex(tab => pathname === tab.href);
    return index !== -1 ? index : 0;
});

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
};

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box p={3} marginTop="50px" marginBottom="70px" color='white'>
        <Link href="/tv" passHref>
          <ArrowBackIosIcon style={{ fontWeight: 600, textDecoration: "none", color: "inherit" }} />
        </Link>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        sx={{ }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index}  sx={{color:'white'}} icon={tab.icon} />
        ))}
      </Tabs>
    </Box>
  );
};

export default DashboardSideBar;
