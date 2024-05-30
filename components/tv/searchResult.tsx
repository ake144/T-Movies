// app/search/SearchResults.tsx
import * as React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface SearchResultsProps {
  results: Array<{ id: number; title: string; description: string }>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <Paper style={{ marginTop: '1rem', padding: '1rem' }}>
      <Typography variant="h6">Search Results</Typography>
      {results.length > 0 ? (
        <List>
          {results.map((movie) => (
            <ListItem key={movie.id}>
              <ListItemText primary={movie.title} secondary={movie.description} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No results found</Typography>
      )}
    </Paper>
  );
};

export default SearchResults;
