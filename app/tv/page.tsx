
import React from 'react';
import { Box } from '@mui/material';
import Content from '@/components/tv/content';

export default function Tv() {
    return (
        <>  
               <Box sx={{ display: 'flex'}}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                        <Content />
                    </Box>
                </Box>
               </Box>
        </>
    );
}
