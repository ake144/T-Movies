'use client'

import { FC, useEffect, useState } from 'react';
import { Box, Paper, Typography, TextField, Grid } from '@mui/material';

// import io from 'socket.io-client';
import { Group, LiveTv, Dvr } from '@mui/icons-material';
import CustomPieChart from './Barchart'
import CustomLineChart from './LinChart'
import { PieChart, Pie,Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


// const socket = io();

const DashboardPage: FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);
  const [programCategories, setProgramCategories] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     socket.on('updateCounts', data => {
//       setUserCount(data.userCount);
//       setProgramCount(data.programCount);
//       setChannelCount(data.channelCount);
//     });

//     socket.on('updateProgramCategories', data => {
//       setProgramCategories(data);
//     });

//     socket.on('updateProgramTypes', data => {
//       setProgramTypes(data);
//     });

//     return () => {
//       socket.off('updateCounts');
//       socket.off('updateProgramCategories');
//       socket.off('updateProgramTypes');
//     };
//   }, []);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };
const filteredProgramCategories = [
    { name: 'Comedy', count: 10 },
    { name: 'Drama', count: 20 },
    { name: 'Action', count: 30 },
    { name: 'News', count: 40 },
    { name: 'Sports', count: 50 },
  ];

  const filteredProgramTypes = [
    { type: 'Series', count: 10 },
    { type: 'Movie', count: 20 },
    { type: 'Documentary', count: 30 },
    { type: 'News', count: 40 },
    { type: 'Sports', count: 50 },
  ];

//   const filteredProgramCategories = programCategories.filter(category =>
//     category.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredProgramTypes = programTypes.filter(type =>
//     type.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        // onChange={handleSearch}
        value={searchQuery}
      />
      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(100px, auto)',
          gap: 3,
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
            <Box  sx={{
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'right',
            }}>
                    <Typography variant="h6">System Use</Typography>
                    <Group sx={{ height: 50,  width: 50, opacity: 0.3, ml: 5 }} />  
            </Box> 
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'left',

            }}
          >
            <Typography variant="h6" sx={{margin:'3'}}>{userCount}</Typography>
            
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
        <Box  sx={{
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'right',
            }}>
          <Typography variant="h6" sx={{margin:'3'}}>Program</Typography>
          <Dvr sx={{ height: 50, width: 50, opacity: 0.3, mt:3, ml:5 }} />
          </Box>
          <Box
            sx={{
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left',
            }}
          >
            <Typography variant="h6"  sx={{margin:'3'}}>
                {programCount}
            </Typography>
            
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
        <Box  sx={{
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'right',
            }}>
          <Typography variant="h6" sx={{margin:'3'}}>Channel </Typography>
          <LiveTv sx={{ height: 50, width: 50, opacity: 0.3, mr: 1,ml:5 }} />
          </Box>
          <Box
            sx={{
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left',
            }}
          >
            <Typography variant="h6"  sx={{margin:'3'}}>{channelCount}</Typography>
            
          </Box>
        </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            gap: 3,
            width: '100%',
          }}
        >
          <Paper elevation={3}  sx={{ p: 2,marginTop:4, width: '70%', }}>     
            <CustomPieChart   />
          </Paper>
          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            <CustomLineChart />
          </Paper>
        </Box>
    </>
  );
};

export default DashboardPage;
