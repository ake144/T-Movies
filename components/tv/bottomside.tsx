import React, { useEffect, useState } from 'react';
import { Tabs, Box, Typography } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SportsIcon from '@mui/icons-material/Sports';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { channels, programs } from '@/utils/actions/count';

const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const MediaTabs = () => {
  const [value, setValue] = useState(0);
  const searchParams = useSearchParams();
  const selectedChannel = Number(searchParams.get('channelId'));
  const typeId = searchParams.get('typeId') || '';
  const categoryId = Number(searchParams.get('categoryId'));
  const [channelCount, setChannelCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [tvShowCount, setTvShowCount] = useState(0);
  const [sportCount, setSportCount] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const tabStyle = {
    border: '2px solid #2f2f5d',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: '120px', sm: '150px', md: '180px' },
    mx: '4px',
    height: { xs: '150px', sm: '180px', md: '220px' },
    color: '#ffffff',
    backgroundColor: '#2f2f5d',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    flexShrink: 0,
  };

  const tabLabelStyle = {
    marginTop: '16px',
    fontSize: { xs: '10px', sm: '12px', md: '14px' },
  };

  useEffect(() => {
    const fetchData = async () => {
      const counts = await programs();
      const channelCount = await channels();

      setChannelCount(channelCount ?? 0);
      setMovieCount(counts.Movies ?? 0);
      setTvShowCount(counts['TV Shows'] ?? 0);
      setSportCount(counts.Sports ?? 0);

      console.log('counts', counts);
    };

    fetchData();
  }, []);

  const constructUrl = (path: string, typeId: string) => {
    let url = `${path}?categoryId=${categoryId}`;
    if (selectedChannel) url += `&channelId=${selectedChannel}`;
    if (typeId) url += `&typeId=${typeId}`;
    return url;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons={false}
        aria-label="media tabs"
        sx={{
          display: 'flex',
          justifyContent: 'start',
          width: '100%',
          padding: { xs: '8px 0', sm: '8px 0', md: '0' },
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <Link href={constructUrl('/tv/live', '1')}>
          <Box sx={tabStyle}>
            <LiveTvIcon fontSize="large" />
            <Typography sx={tabLabelStyle}>Live TV's</Typography>
            <Typography variant="body2">+{channelCount} Channels</Typography>
          </Box>
        </Link>
        <Link href={constructUrl('/tv/movies', '2')}>
          <Box sx={tabStyle}>
            <MovieIcon fontSize="large" />
            <Typography sx={tabLabelStyle}>Movies</Typography>
            <Typography variant="body2">+{movieCount} Movies</Typography>
          </Box>
        </Link>
        <Link href={constructUrl('/tv/tvshow', '3')}>
          <Box sx={tabStyle}>
            <TvIcon fontSize="large" />
            <Typography sx={tabLabelStyle}>TV Shows</Typography>
            <Typography variant="body2">+{tvShowCount} Series</Typography>
          </Box>
        </Link>
        <Link href={constructUrl('/tv/sport', '4')}>
          <Box sx={tabStyle}>
            <SportsIcon fontSize="large" />
            <Typography sx={tabLabelStyle}>Sports</Typography>
            <Typography variant="body2">+{sportCount} Channels</Typography>
          </Box>
        </Link>
      </Tabs>
    </Box>
  );
};

export default MediaTabs;
