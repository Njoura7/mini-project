import { useMemo, useState } from 'react';
import type { Flashcard } from '@/types/flashcard';
import flashcardsData from '@/data/flashcards.json';
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
import CreateFlashcardModal from './components/CreateFlashcardModal';
import EditFlashcardModal from './components/EditFlashcardModal';
import FilterBar from './components/FilterBar';
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Modal
  const [flashcards, setFlashcards] = useState<Flashcard[]>(flashcardsData);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = useMemo(() => {
    const uniqueTopics = [...new Set(flashcards.map((card) => card.topic))];
    return uniqueTopics.sort();
  }, [flashcards]);

  const filteredFlashcards = useMemo(() => {
    if (selectedTopic === 'All') {
      return flashcards;
    }
    return flashcards.filter((card) => card.topic === selectedTopic);
  }, [flashcards, selectedTopic]);

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedFlashcard(null);
  };

  const handleSaveFlashcard = (updatedCard: Flashcard) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setSelectedFlashcard(updatedCard);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const handleRowClick = (flashcard: Flashcard) => {
    console.log('Flashcard clicked:', flashcard);
    setSelectedFlashcard(flashcard);
    setEditModalOpen(true);
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
            topics={topics}
          />
        </Box>

        <Paper sx={{ p: 3 }}>
          <FilterBar
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            topics={topics}
            flashcardCount={filteredFlashcards.length}
          />
          <FlashcardTable
            flashcards={filteredFlashcards}
            onRowClick={handleRowClick}
            darkMode={darkMode}
          />
          <EditFlashcardModal
            open={editModalOpen}
            onClose={handleModalClose}
            flashcard={selectedFlashcard}
            onSave={handleSaveFlashcard}
            topics={topics}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
