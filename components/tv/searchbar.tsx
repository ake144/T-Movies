// app/search/page.tsx
'use client';

import * as React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { TextField, Button, CircularProgress, Container, Typography } from '@mui/material';
import SearchResults from './searchResult';
import { searchMovies } from '@/utils/actions/searchMovies';

interface SearchPageProps {
  id: number;
  title: string;
  description: string;  
}


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState<SearchPageProps[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);



  const movies = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      description:'Two imprisoned',
    },
    {
      id: 2,
      title: 'The Godfather',
      description:'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      description:'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    },
    {
      id: 4,
      title: '12 Angry', 
      description: 'very angry boy'
    }
  ]
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);


    const filteredMovies: SearchPageProps[] = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
    })

    setResults(filteredMovies)
  };


  // React.useEffect(() => {
  //   const search = async () => {
  //     setIsSearching(true);
  //     try {
  //       if (debouncedSearchTerm) {
  //         // const movies = await searchMovies(debouncedSearchTerm) as any;
  //         // setResults(movies);
         

  //       } else {
  //         setResults([]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsSearching(false);
  //     }
  //   };

  //   search();
  // }, [debouncedSearchTerm]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Search
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Search Movies"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: 'white', }}
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
