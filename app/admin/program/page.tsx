'use client';

import React, { useEffect, useState } from 'react';
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
  Switch, 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { Edit, Delete, Visibility, Add, FilterList, FileDownload } from '@mui/icons-material';
import { updatePrograms,deletePrograms,fetchPrograms, } from '@/utils/actions/createProgram';
import Link from 'next/link';
import { set } from 'zod';

interface ProgramSchema {
    id: number;
    title:string;
    duration:number;
    description:string;
    videoUrl: string;
    channelId:number;
    typeId:number;
    categoryId:number;
}

const Program = () => {
  const [programs, setPrograms] = useState<ProgramSchema[]>([]);
  const [selectedprogram, setSelectedprogram] = useState<ProgramSchema | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    loadPrograms();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePrograms(id);
      setPrograms(programs.filter(program => program.id !== id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  }
 const handleEdit = (program: any) => {
       setSelectedprogram(program);
       setIsEditModalOpen(true);
       
 }
const handleUpdate = async (data: ProgramSchema) => {
    try {
      await updatePrograms(data.id, data);
      setPrograms(programs.map(program => (program.id === data.id ? data : program)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  }

  const handleDeleteConfirm = (program: any) => {
        setSelectedprogram(program);
        setIsDeleteConfirmOpen(true);
  }
  


  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField label="Search" variant="outlined" size="small" />
        <Box>
          <Button variant="outlined" startIcon={<FileDownload />} color="primary" sx={{ mr: 1 }}>
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
                  <Switch checked={true}   color="success" />
                </TableCell>
                <TableCell>
                  <Link href={program.videoUrl}>
                        <IconButton >
                          <Visibility />
                        </IconButton>
                  </Link>
                  <IconButton color="primary" onClick={() => handleEdit(program)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(program)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Program</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={selectedprogram?.title || ''}
            onChange={(e) => setSelectedprogram(prev => prev ? { ...prev, title: e.target.value } : null)}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration im ms"
            type="number"
            fullWidth
            value={selectedprogram?.duration || 0}
            onChange={(e) => setSelectedprogram({...selectedprogram!,duration: Number(e.target.value)})}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={selectedprogram?.description || ''}
            onChange={(e) => setSelectedprogram(prev => prev ? { ...prev, description: e.target.value } : null)} 
          />
          <TextField
            margin="dense"
            id="videoUrl"
            label="Video URL"
            type="text"
            fullWidth
            value={selectedprogram?.videoUrl || ''}
            onChange={(e) => setSelectedprogram(prev => prev ? { ...prev, videoUrl: e.target.value } : null)}
          />
          </DialogContent>
           <DialogActions>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={() => selectedprogram && handleUpdate(selectedprogram)}>Update</Button>
            </DialogActions>

     </Dialog>   
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Program</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this program?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() =>  selectedprogram && handleDelete(selectedprogram.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    
    </Box>
  );
};

export default Program;
