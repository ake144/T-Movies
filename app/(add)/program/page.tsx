'use client';

import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Paper,
  InputLabel
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProgram } from '@/utils/actions/createProgram'; // Import the server action
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgramSchemaType,ProgramSchema } from '@/utils/types';
import { categories, channels, types } from '@/utils/seed';


const AddProgram = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/program')
    }
  })

  const router = useRouter();
  const { control, handleSubmit, formState: { errors },reset } = useForm<ProgramSchemaType>({
    resolver: zodResolver(ProgramSchema)
  });

  const onSubmit: SubmitHandler<ProgramSchemaType> = async (data) => {
    try {

      const formData = {
        ...data,
        duration: Number(data.duration)
      };

      await createProgram(formData);
      toast.success('Program created successfully', {
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
      console.log('Program created successfully');
      reset();
    } catch (error:any) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        p: 3,
      }}
    >
      

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Add Program
      </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Video URL
              </Typography>
              <Controller
                name="videoUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    fullWidth
                    error={!!errors.videoUrl}
                    helperText={errors.videoUrl?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Title
              </Typography>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Duration
              </Typography>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="filled"
                    fullWidth
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Description
              </Typography>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Category
              </Typography>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <FormControl variant="filled" fullWidth error={!!errors.categoryId}>
                    <InputLabel>Select...</InputLabel>
                    <Select {...field}>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.categoryId && <Typography color="error">{errors.categoryId.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Channel
              </Typography>
              <Controller
                name="channelId"
                control={control}
                render={({ field }) => (
                  <FormControl variant="filled" fullWidth error={!!errors.channelId}>
                    <InputLabel>Select...</InputLabel>
                    <Select {...field}>
                      {channels.map((channel) => (
                        <MenuItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.channelId && <Typography color="error">{errors.channelId.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Type
              </Typography>
              <Controller
                name="typeId"
                control={control}
                render={({ field }) => (
                  <FormControl variant="filled" fullWidth error={!!errors.typeId}>
                    <InputLabel>Select...</InputLabel>
                    <Select {...field}>
                      {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.typeId && <Typography color="error">{errors.typeId.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>
         
          <Grid item xs={12} sm={6}>
              <Typography variant='caption' sx={{ textAlign: 'center', mb: 3 }}>
                Image URL
              </Typography>
              <Controller
                name="imageUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    fullWidth
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                  />
                )}
              />
            </Grid>
            </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: '90px', height: '35px', marginLeft: '10px', border: '2px solid', color: 'black' }}
              onClick={() => {
                router.push('/admin');
                // Add logic to clear the form or navigate away
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '90px', height: '35px', marginLeft: '10px' }}
              type="submit"
            >
              Add
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProgram;
