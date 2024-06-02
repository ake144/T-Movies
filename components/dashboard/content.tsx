'use client'

import { FC, useEffect, useState } from 'react';
import { Box, Paper, Typography, TextField, Grid, Button } from '@mui/material';

// import io from 'socket.io-client';
import { Group, LiveTv, Dvr, FileDownload, FilterList, Add } from '@mui/icons-material';
import CustomPieChart from './Barchart'
import CustomLineChart from './LinChart'
import { PieChart, Pie,Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { channels, programsCount, users } from '@/utils/actions/count';
import { set } from 'zod';
import { ChannelSchema } from '@/utils/types';
import Link from 'next/link';


// const socket = io();

const DashboardPage: FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);
  const [programCategories, setProgramCategories] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userCount, movieCount, channelCount] = await Promise.all([
          users(),
          programsCount(),
          channels()
        ]);
        setUserCount(userCount ?? 0);
        setProgramCount(movieCount ?? 0);
        setChannelCount(channelCount ?? 0);

        console.log("Dashboard counts:", { userCount, movieCount, channelCount });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <form >
          <TextField 
            label="Search" 
            disabled={true}
            name='search'
            // onChange={handleChange}
            variant="outlined" 
            size="small" 
          />
        </form>
        <Box>
          <Button variant="outlined" startIcon={<FileDownload />} color="primary" sx={{ mr: 1 }}>
            Export
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} color="primary" sx={{ mr: 1 }}>
            Add Filter
          </Button>

            <Button variant="contained" startIcon={<Add />} color="primary">
              Add filter
            </Button>

        </Box>
      </Box>
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
                    <Typography variant="h6">System User</Typography>
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
