import * as React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { MovieSchema } from '@/utils/types';
import Link from 'next/link';

interface SearchResultsProps {
  results: MovieSchema[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <Paper style={{ marginTop: '1rem', padding: '1rem' }}>
      <Typography variant="h6" sx={{color:''}}>Search Results</Typography>
      {results.length > 0 ? (
        <List>
          {results.map((movie: MovieSchema) => (
            <Link href={movie.videoUrl} >
                <ListItem key={movie.id}>
                  <ListItemText primary={movie.title} secondary={movie.description} />
                </ListItem>
            </Link>
          ))}
        </List>
      ) : (
        <Typography>No results found</Typography>
      )}
    </Paper>
  );
};

export default SearchResults;