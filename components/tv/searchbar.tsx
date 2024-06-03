'use client';

import * as React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
import SearchResults from './searchResult';
import { searchMovies } from '@/utils/actions/searchMovies';
import { useEffect, useState } from 'react';
import { MovieSchema } from '@/utils/types';

interface SearchResultsProps {
  results: MovieSchema[];
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('T');
  const [results, setResults] = useState<MovieSchema[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search') as string;

    setSearchTerm(searchTerm);
    event.currentTarget.reset();
    event.currentTarget.focus();
  };

  useEffect(() => {
    const search = async () => {
      try {
        setIsSearching(true);
        if (debouncedSearchTerm) {
          const searchResults: MovieSchema[] = await searchMovies(debouncedSearchTerm); 
          setResults(searchResults); 
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Search
      </Typography>
      <form onSubmit={handleForm}>
        <TextField
          label="Search Movies"
          variant="outlined"
          name="search"
          fullWidth
          sx={{ backgroundColor: 'white' }}
          value={searchTerm}
          onChange={handleChange}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSearching}
          type="submit"
        >
          {isSearching ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </form>
      <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
        <SearchResults results={results} />
      </Box>
    </Container>
  );
}
