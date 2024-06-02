'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableSortLabel
} from '@mui/material';
import { Edit, Delete, Visibility, Add, FileDownload, FilterList } from '@mui/icons-material';
import Link from 'next/link';
import { useDebounce } from '@uidotdev/usehooks';
import { fetchChannels, deleteChannel, updateChannel } from '@/utils/actions/createChannel';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TablePagination from '@/components/pagination'; // Adjust the import path as needed

interface Channel {
  id: number;
  name: string;
  isActive: boolean;
}

const ChannelList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchResults, setSearchResults] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalChannels, setTotalChannels] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('asc');

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/admin/channel');
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const { channels, totalChannels } = await fetchChannels({
          page: currentPage,
          limit: rowsPerPage,
          sortField,
          sortOrder,
        });
        setChannels(channels);
        setTotalChannels(totalChannels);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    loadChannels();
  }, [ currentPage, rowsPerPage, sortField, sortOrder]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const results = channels.filter(channel =>
        channel.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(channels);
    }
  }, [debouncedSearchTerm, channels]);

  const handleDelete = async (id: number) => {
    try {
      await deleteChannel(id);
      setChannels(channels.filter(channel => channel.id !== id));
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleEdit = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsDeleteConfirmOpen(true);
  };

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
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <form onSubmit={handleForm}>
          <TextField
            label="Search"
            value={searchTerm}
            name='search'
            onChange={handleChange}
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
          <Link href='/channel'>
            <Button variant="contained" startIcon={<Add />} color="primary">
              Add Channel
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
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSortRequest('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(debouncedSearchTerm ? searchResults : channels).map((channel) => (
              <TableRow key={channel.id}>
                <TableCell>{channel.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={channel.isActive}
                    color="success"
                    // onChange={() => handleToggleActive(channel)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(channel)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(channel)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        totalItems={totalChannels}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {/* Edit Channel Dialog */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            type="text"
            fullWidth
            value={selectedChannel?.name || ''}
            onChange={(e) => setSelectedChannel({ ...selectedChannel, id: selectedChannel?.id || 0, name: e.target.value, isActive: selectedChannel?.isActive || false })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={async () => {
            try {
              if (selectedChannel) {
                await updateChannel(selectedChannel.id, selectedChannel.name);
                setIsEditModalOpen(false);
                setChannels(channels.map(channel => channel.id === selectedChannel.id ? selectedChannel : channel));
                setSearchResults(searchResults.map(channel => channel.id === selectedChannel.id ? selectedChannel : channel));
              }
            } catch (error) {
              console.error('Error updating channel:', error);
            }
          }}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this channel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            if (selectedChannel) {
              handleDelete(selectedChannel.id);
              setIsDeleteConfirmOpen(false);
            }
          }} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChannelList;
