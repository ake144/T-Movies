import React from 'react';
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
  Box 
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import Link from 'next/link';



const Channel = () => {
 

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField label="Search" variant="outlined" size="small" />
       <Link href='/channel'> <Button variant="contained" startIcon={<Add />} color="primary">Add Channel</Button></Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>GOT</TableCell>
              <TableCell>
                <Switch defaultChecked color="success" />
              </TableCell>
              <TableCell>
                <IconButton color="primary">
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
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Channel;
