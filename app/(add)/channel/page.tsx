'use client';

import React, { useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createChannel } from '@/utils/actions/createChannel';
import { useRouter,redirect } from 'next/navigation';

import { useSession } from 'next-auth/react'


// Define the Zod schema for channel validation
const ChannelSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required').max(100, 'Channel name must be less than 100 characters'),
});

type ChannelSchemaType = z.infer<typeof ChannelSchema>;

function AddChannel() {


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/channel')
    }
  })
  const [channelName,setChannelName] = useState("")
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<ChannelSchemaType>({
    resolver: zodResolver(ChannelSchema)
  });

  const onSubmit: SubmitHandler<ChannelSchemaType> = async (data) => {
    try {
      await createChannel(data.channelName); // Pass the channelName as an argument
      console.log('Channel added:', data.channelName);
      setChannelName('')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setChannelName('')
    router.push('/admin/channel');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        color: 'black',
        minHeight: '100vh',
        width: '100%',
        p: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          marginLeft: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', // Center content horizontally
        }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center', color: 'black', fontWeight: 'bold', mb: 3 }}>
          Add Channel
        </Typography>
        <FormControl
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            color: 'black',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            Name
          </Typography>
          <Controller
            name="channelName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="filled"
                id="channelName"
                error={!!errors.channelName}
                helperText={errors.channelName?.message}
              />
            )}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
              marginLeft: '180px',
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: '30%', fontWeight: 'bold', height: '50px', border: '1px solid', color: 'black' }}
              onClick={handleCancel} // Clear input on cancel
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '30%', fontWeight: 'bold', height: '50px', backgroundColor: 'black', color: 'white' }}
              type="submit"
            >
              Add
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}

export default AddChannel;
