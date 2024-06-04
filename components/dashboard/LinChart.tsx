'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { channels, programs } from '@/utils/actions/count';

const CustomLineChart = () => {
  const [channelCount, setChannelCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [tvShowCount, setTvShowCount] = useState(0);
  const [sportCount, setSportCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const counts = await programs();
      const channelCount = await channels();

      setChannelCount(channelCount ?? 0);
      setMovieCount(counts.Movies ?? 0);
      setTvShowCount(counts['TV Shows'] ?? 0);
      setSportCount(counts.Sports ?? 0);
    };

    fetchData();
  }, []);

  const data = [
    { day: 'MON', A: 30, B: 20, C: 27, D: 18, E: 23 },
    { day: 'TUE', A: 40, B: 30, C: 28, D: 19, E: 24 },
    { day: 'WED', A: 50, B: 35, C: 35, D: 22, E: 28 },
    { day: 'THU', A: 45, B: 32, C: 33, D: 24, E: 30 },
    { day: 'FRI', A: 35, B: 27, C: 30, D: 20, E: 26 },
    { day: 'SAT', A: 40, B: 33, C: 35, D: 22, E: 29 },
    { day: 'SUN', A: 50, B: 40, C: 40, D: 25, E: 32 },
  ];

  const legendData = [
    { name: 'Live TV', color: '#8884d8', value: channelCount },
    { name: 'Movies', color: '#82ca9d', value: movieCount },
    { name: 'TV Shows', color: '#ffc658', value: tvShowCount },
    { name: 'Sports', color: '#d0ed57', value: sportCount },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="70%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="A" stroke="#8884d8" />
          <Line type="monotone" dataKey="B" stroke="#82ca9d" />
          <Line type="monotone" dataKey="C" stroke="#ffc658" />
          <Line type="monotone" dataKey="D" stroke="#d0ed57" />
          <Line type="monotone" dataKey="E" stroke="#4daf4a" />
        </LineChart>
      </ResponsiveContainer>
      <Box sx={{ ml: 1, width:{xs:'100px', sm:'250px', md:'auto'} }}>
        <Typography variant="h6" align="center" sx={{ mb: 1, backgroundColor: 'black', color: 'white', padding: '5px' }}>
          201<br />overall program
        </Typography>
        <List>
          {legendData.map((item) => (
            <ListItem key={item.name}>
              <ListItemIcon>
                <Box sx={{ width: {md:'24px', xs:'15px', sm:'20px'}, height:  {md:'24px', xs:'15px', sm:'20px'}, backgroundColor: item.color }} />
              </ListItemIcon>
              <ListItemText primary={`${item.name}: ${item.value}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CustomLineChart;
