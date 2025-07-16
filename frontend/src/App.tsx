import { useMemo, useState } from 'react';
import type { Flashcard } from '@/types/flashcard';
import {
  Container,
  Typography,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import Header from '@/components/Header';
import FlashcardTable from '@/components/FlashcardTable';
import flashcardsData from '@/data/flashcards.json';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const flashcards: Flashcard[] = useMemo(() => flashcardsData, []);

  const handleRowClick = (flashcard: Flashcard) => {
    console.log('Flashcard clicked:', flashcard);
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} onThemeToggle={handleThemeToggle} />

      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Flashcard Manager
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            Organize and study your flashcards efficiently
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <FlashcardTable
            flashcards={flashcards}
            onRowClick={handleRowClick}
            darkMode={darkMode}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
