
import React from 'react';
import { Box } from '@mui/material';
import Content from '@/components/tv/content';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Tv() {

    const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv');
  }

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
