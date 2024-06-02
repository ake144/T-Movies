import React from 'react';
import { TablePagination as MuiTablePagination } from '@mui/material';

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TablePagination: React.FC<PaginationProps> = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <MuiTablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={totalItems}
      rowsPerPage={rowsPerPage}
      page={currentPage - 1}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default TablePagination;
