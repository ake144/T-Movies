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

// Zod schema for form validation
const ProgramSchema = z.object({
  videoUrl: z.string().url('Invalid URL'),
  title: z.string().min(1, 'Title is required'),
  duration: z.number().positive('Duration must be a positive number'),
  description: z.string().min(5, 'Description is required'),
  categoryId: z.number().min(1, 'Category is required'),
  channelId: z.number().min(1, 'Channel is required'),
  typeId: z.number().min(1, 'Type is required')
});

type ProgramSchemaType = z.infer<typeof ProgramSchema>;

const AddProgram = () => {
  const { control, handleSubmit, formState: { errors },reset } = useForm<ProgramSchemaType>({
    resolver: zodResolver(ProgramSchema)
  });

  const categories = [
    { id: 1, name: 'Recommended' },
    { id: 2, name: 'Popular' },
    { id: 3, name: 'Featured' },
    { id: 4, name: 'Favorites' },
    { id: 5, name: 'Watch Later' },
  ];

  const channels = [
    { id: 1, name: 'HBO' },
    { id: 2, name: 'ABC TV' },
    { id: 3, name: 'NBC TV' },
    { id: 4, name: 'AMC TV' },
    { id: 5, name: 'Disney' },
    { id: 6, name: 'FOX' },
  ];

  const types = [
    { id: 1, name: 'Live TV' },
    { id: 2, name: 'Movies' },
    { id: 3, name: 'TV Shows' },
    { id: 4, name: 'Sports' },
  ];

  const onSubmit: SubmitHandler<ProgramSchemaType> = async (data) => {
    try {
      // Ensure duration is a number
      const formData = {
        ...data,
        duration: Number(data.duration)
      };

      await createProgram(formData);
      console.log('Program created successfully');
      reset();
    } catch (error) {
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
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Add Program
      </Typography>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={10140000}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="filled"
                    fullWidth
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
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
