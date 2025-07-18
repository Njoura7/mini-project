import { useMemo, useState } from 'react';
import { useFlashcards } from '@/hooks/queries';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { AddBoxRounded as AddFlashCard } from '@mui/icons-material';
import Header from '@/components/Header';
import FlashcardTable from '@/components/FlashcardTable';
import CreateFlashcardModal from '@/components/CreateFlashcardModal';
import FilterBar from '@/components/FilterBar';
import TopicManager from '@/components/TopicManager';
import type { Flashcard } from '@/types/flashcard';

export default function App() {
  //TODO:  FIXME: to be implemented soon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: flashcards = [], isPending, error, isError } = useFlashcards();
  const [darkMode, setDarkMode] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('All');

  const filteredFlashcards = useMemo(() => {
    if (selectedTopic === 'All') return flashcards;
    return flashcards.filter(
      (card) => card.topicId.toString() === selectedTopic
    );
  }, [flashcards, selectedTopic]);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
    [darkMode]
  );

  const handleRowClick = (flashcard: Flashcard) => {
    console.log('Flashcard clicked:', flashcard);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode((prev) => !prev)}
      />

      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Flashcard Manager
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            Organize and study your flashcards efficiently
          </Typography>
          <Button
            onClick={() => setCreateModalOpen(true)}
            sx={{ mt: 2 }}
            variant='contained'
          >
            Add a new Flashcard
            <AddFlashCard className='ml-2' fontSize='large' />
          </Button>
          <CreateFlashcardModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
          />
        </Box>

        <Paper sx={{ p: 3 }}>
          <FilterBar
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            flashcardCount={filteredFlashcards.length}
          />
          <TopicManager
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
          />
          {/* put the delete and PATCH and pass with props */}
          <FlashcardTable
            flashcards={filteredFlashcards}
            onRowClick={handleRowClick}
            darkMode={darkMode}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
