'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Cell, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { totalFavorites } from '@/utils/actions/addFav'; 
import { totalWatchLatter } from '@/utils/actions/addWatch';

const CustomPieChart = () => {
  const [fav, setFav] = useState(0);
  const [watchLater, setWatchLater] = useState(0);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const favCount = await totalFavorites();
        const watchLaterCount = await totalWatchLatter();
        setFav(favCount ?? 0);
        setWatchLater(watchLaterCount ?? 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const data = [
    { name: 'Recommended', value: 400, color: '#8884d8' },
    { name: 'Featured', value: 300, color: '#82ca9d' },
    { name: 'Favorites', value: fav, color: '#ffc658' },
    { name: 'Watch Later', value: watchLater, color: '#d0ed57' },
    { name: 'Popular', value: 100, color: '#4daf4a' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="50%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#333" style={{ fontSize: '20px' }}>
            Department
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ ml: 1 }}>
        <List>
          {data.map((entry, index) => (
            <ListItem key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <Box sx={{ width: 20, height: 20, backgroundColor: entry.color, borderRadius: '100%' }} />
              </ListItemIcon>
              <ListItemText primary={entry.name} sx={{ marginRight: 2 }} />
              <ListItemText primary={entry.value} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CustomPieChart;