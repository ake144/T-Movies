'use client';

import React from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Switch 
} from '@mui/material';
import { Edit, Delete, Visibility, Add, FilterList, FileDownload } from '@mui/icons-material';
import Link from 'next/link';

const Program = () => {
  const programs = [
    {
      id: 1,
      title: 'Game of Thrones',
      duration: '2h',
      description: 'Medieval Movie Series',
      status: true,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField label="Search" variant="outlined" size="small" />
        <Box>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            color="primary"
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} color="primary" sx={{ mr: 1 }}>
            Add Filter
          </Button>
          <Link href='/program'>
            <Button variant="contained" startIcon={<Add />} color="primary">
            Add Program
          </Button>
          </Link>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.id}</TableCell>
                <TableCell>{program.title}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>
                  <Switch checked={program.status} color="success" />
                </TableCell>
                <TableCell>
                  <IconButton sx={{background :'black'}}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Program;
