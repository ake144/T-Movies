import * as React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { MovieSchema } from '@/utils/types';
import Link from 'next/link';

interface SearchResultsProps {
  results: MovieSchema[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <Paper style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Search Results from All Channel</Typography>
      {results.length > 0 ? (
        <List>
          {results.map((movie: MovieSchema) => (
            <Link href={movie.videoUrl} key={movie.id}>
              <ListItem button component="a">
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
