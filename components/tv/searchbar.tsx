'use client';

import * as React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { TextField, Button, CircularProgress, Container, Typography } from '@mui/material';
import SearchResults from './searchResult';
import { searchMovies } from '@/utils/actions/searchMovies';
import { useEffect, useState } from 'react';
import { MovieSchema } from '@/utils/types';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('angle');
  const [results, setResults] = useState<MovieSchema[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search');

    event.currentTarget.reset();
    event.currentTarget.focus();
  };

  useEffect(() => {
    const search = async () => {
    
      try {
        let results: React.SetStateAction<MovieSchema[]> = []
        setIsSearching(true);
        if (debouncedSearchTerm) {
          const results = await searchMovies(searchTerm);
        }
        setIsSearching(false) 
        setResults(results);

      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [searchTerm]);

  return (
    <Container>
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
      <SearchResults results={results} />
    </Container>
  );
}