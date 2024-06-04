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
  DialogActions,
  TableSortLabel
} from '@mui/material';
import { Edit, Delete, Visibility, Add, FilterList, FileDownload } from '@mui/icons-material';
import { updatePrograms, deletePrograms, fetchPrograms } from '@/utils/actions/createProgram';
import Link from 'next/link';
import { useDebounce } from '@uidotdev/usehooks';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TablePagination from '@/components/pagination';
import { set } from 'zod';

interface ProgramSchema {
  id: number;
  title: string;
  duration: number;
  description: string;
  videoUrl: string;
  channelId: number;
  typeId: number;
  categoryId: number;
  imageUrl: string | null;
}

const Program = () => {
  const [programs, setPrograms] = useState<ProgramSchema[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramSchema | null>(null);
  const [searchResults, setSearchResults] = useState<ProgramSchema[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [totalPrograms, setTotalPrograms] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('asc');

  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/admin/channel')
    }
  })

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const {programs, totalPrograms} = await fetchPrograms({
          page: currentPage,
          limit: rowsPerPage,
          sortField,
          sortOrder
        });
        setPrograms(programs);
        setTotalPrograms(totalPrograms);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };
    loadPrograms();
  }, [currentPage, rowsPerPage, sortField, sortOrder]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  useEffect(() => {
        if (debouncedSearchTerm) {
          const results = programs.filter(program => 
            program.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setSearchResults(results);
        } else {
          setSearchResults(programs);
        }
  }, [debouncedSearchTerm, programs]);

  const handleDelete = async (id: number) => {
    try {
      await deletePrograms(id);
      setPrograms(programs.filter(program => program.id !== id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  }

  const handleEdit = (program: ProgramSchema) => {
    setSelectedProgram(program);
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

  const handleDeleteConfirm = (program: ProgramSchema) => {
    setSelectedProgram(program);
    setIsDeleteConfirmOpen(true);
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSortRequest = (field: string) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };


  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <form onSubmit={handleForm}>
          <TextField 
            label="Search" 
            name='search'
            value={searchTerm}
            variant="outlined" 
            onChange={handleChange}
            size="small" 
          />
        </form>
        <Box>
          <Button variant="outlined" startIcon={<FileDownload />} color="primary" sx={{ mr: 1, display:{sm:'none', xs:'none', md:'inline'}}}>
            Export
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} color="primary" sx={{ mr: 1, display:{sm:'none', xs:'none', md:'inline'}}}>
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
              <TableCell>
              <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortOrder : 'asc'}
                  onClick={() => handleSortRequest('id')}
                >
                Id
                </TableSortLabel>
                </TableCell>
              <TableCell>
              <TableSortLabel
                  active={sortField === 'title'}
                  direction={sortField === 'title' ? sortOrder : 'asc'}
                  onClick={() => handleSortRequest('title')}
                >
                  Title
                </TableSortLabel>
                </TableCell>
              <TableCell>
              <TableSortLabel
                  active={sortField === 'duration'}
                  direction={sortField === 'duration' ? sortOrder : 'asc'}
                  onClick={() => handleSortRequest('duration')}
                >
                  Duration
                </TableSortLabel>
                
                </TableCell>
              <TableCell>
                   <TableSortLabel
                  active={sortField === 'description'}
                  direction={sortField === 'description' ? sortOrder : 'asc'}
                  onClick={() => handleSortRequest('description')}
                  >
                    Description
                  </TableSortLabel>
               </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(debouncedSearchTerm ? searchResults : programs).map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.id}</TableCell>
                <TableCell>{program.title}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>
                  <Switch checked={true} color="success" />
                </TableCell>
                <TableCell>
                  <Link href={program.videoUrl}>
                    <IconButton>
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
      <TablePagination
        totalItems={totalPrograms}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

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
            value={selectedProgram?.title || ''}
            onChange={(e) => setSelectedProgram(prev => prev ? { ...prev, title: e.target.value } : null)}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration in ms"
            type="number"
            fullWidth
            value={selectedProgram?.duration || 0}
            onChange={(e) => setSelectedProgram(prev => prev ? { ...prev, duration: Number(e.target.value) } : null)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={selectedProgram?.description || ''}
            onChange={(e) => setSelectedProgram(prev => prev ? { ...prev, description: e.target.value } : null)} 
          />
          <TextField
            margin="dense"
            id="videoUrl"
            label="Video URL"
            type="text"
            fullWidth
            value={selectedProgram?.videoUrl || ''}
            onChange={(e) => setSelectedProgram(prev => prev ? { ...prev, videoUrl: e.target.value } : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={() => selectedProgram && handleUpdate(selectedProgram)}>Update</Button>
        </DialogActions>
      </Dialog>   
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Program</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this program?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => selectedProgram && handleDelete(selectedProgram.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Program;