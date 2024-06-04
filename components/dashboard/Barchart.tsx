'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Cell, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { programCountWithCategory } from '@/utils/actions/count';

const CustomPieChart = () => {
  const [fav, setFav] = useState(0);
  const [watchLater, setWatchLater] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const counts = await programCountWithCategory();
        setRecommended(counts.Recommended ?? 0);
        setFeatured(counts.Featured ?? 0);
        setFav(counts.Favorites ?? 0);
        setWatchLater(counts['Watch Later'] ?? 0);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const data = [
    { name: 'Recommended', value: recommended, color: '#8884d8' },
    { name: 'Featured', value: featured, color: '#82ca9d' },
    { name: 'Favorites', value: fav, color: '#ffc658' },
    { name: 'Watch Later', value: watchLater, color: '#d0ed57' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <ResponsiveContainer  width="50%"  height={200}>
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
                <Box sx={{ width:  {md:'20px', xs:'10px', sm:'15px'}, height: {md:'20px', xs:'10px', sm:'15px'}, backgroundColor: entry.color, borderRadius: '100%' }} />
              </ListItemIcon>
              <ListItemText primary={entry.name} sx={{ marginRight: {md:'2px', sm:'1px',xs:'.5px'} }} />
              <ListItemText primary={entry.value} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CustomPieChart;
