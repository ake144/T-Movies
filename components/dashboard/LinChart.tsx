'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

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
  { name: 'Category A', color: '#8884d8', value: 50 },
  { name: 'Category B', color: '#82ca9d', value: 40 },
  { name: 'Category C', color: '#ffc658', value: 40 },
  { name: 'Category D', color: '#d0ed57', value: 25 },
  { name: 'Category E', color: '#4daf4a', value: 32 },
];

const CustomLineChart = () => {
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
      <Box sx={{ ml: 1 }}>
        <Typography variant="h6" align="center" sx={{ mb: 1, backgroundColor: 'black', color: 'white', padding: '5px' }}>
          201<br />over all program
        </Typography>
        <List>
          {legendData.map((entry, index) => (
            <ListItem key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                  <Box sx={{ width: 20, height: 20, backgroundColor: entry.color, borderRadius:'100%' }} />
                </ListItemIcon>
                <ListItemText primary={entry.name}  sx={{marginRight:3}}/>
                <ListItemText primary={entry.value} />            
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default CustomLineChart;
