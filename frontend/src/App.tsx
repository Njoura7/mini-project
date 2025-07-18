import { useMemo, useState, useCallback } from 'react';
import { useDeleteFlashcard, useUpdateFlashcard } from '@/hooks/mutations';
import { useFlashcards, useTopics } from '@/hooks/queries';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AddBoxRounded as AddFlashCard } from '@mui/icons-material';
import Header from '@/components/Header';
import FlashcardTable from '@/components/FlashcardTable';
import CreateFlashcardModal from '@/components/Modals/CreateFlashcardModal';
import FilterBar from '@/components/FilterBar';
import TopicManager from '@/components/TopicManager';
import type { Flashcard } from '@/types/flashcard';

export default function App() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Data fetching
  const {
    data: flashcards = [],
    isPending: isFlashcardsLoading,
    error: flashcardsError,
    isError: isFlashcardsError,
  } = useFlashcards();

  const {
    data: topics = [],
    isPending: isTopicsLoading,
    error: topicsError,
    isError: isTopicsError,
  } = useTopics();

  // Mutations
  const { mutate: deleteFlashcard, isPending: isDeleting } =
    useDeleteFlashcard();
  const { mutate: updateFlashcard, isPending: isUpdating } =
    useUpdateFlashcard();

  // Memoized values
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
    [darkMode]
  );

  const filteredFlashcards = useMemo(() => {
    if (selectedTopic === 'All') return flashcards;
    return flashcards.filter(
      (card) => card.topicId.toString() === selectedTopic
    );
  }, [flashcards, selectedTopic]);

  // Handlers
  const handleRowClick = useCallback((flashcard: Flashcard) => {
    console.log('Flashcard clicked:', flashcard);
  }, []);

  const handleDeleteFlashcard = useCallback(
    (id: number) => {
      deleteFlashcard(id, {
        onError: (error) => {
          console.error('Failed to delete flashcard:', error);
        },
      });
    },
    [deleteFlashcard]
  );

  const handleUpdateFlashcard = useCallback(
    (flashcard: Flashcard) => {
      updateFlashcard(flashcard, {
        onError: (error) => {
          console.error('Failed to update flashcard:', error);
        },
      });
    },
    [updateFlashcard]
  );

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const openCreateModal = useCallback(() => {
    setCreateModalOpen(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setCreateModalOpen(false);
  }, []);

  const handleTopicChange = useCallback((topicId: string) => {
    setSelectedTopic(topicId);
  }, []);

  // Combined loading and error states
  const isLoading = isFlashcardsLoading || isTopicsLoading;
  const isError = isFlashcardsError || isTopicsError;
  const errorMessage =
    flashcardsError?.message || topicsError?.message || 'Unknown error';

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity='error' sx={{ m: 2 }}>
        Error: {errorMessage}
      </Alert>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} onThemeToggle={toggleDarkMode} />

      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Flashcard Manager
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            Organize and study your flashcards efficiently
          </Typography>
          <Button
            onClick={openCreateModal}
            sx={{ mt: 2 }}
            variant='contained'
            startIcon={<AddFlashCard />}
          >
            Add a new Flashcard
          </Button>
          <CreateFlashcardModal
            open={createModalOpen}
            onClose={closeCreateModal}
          />
        </Box>

        <Paper sx={{ p: 3 }}>
          <FilterBar
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
            flashcardCount={filteredFlashcards.length}
          />
          <TopicManager
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
          />
          <FlashcardTable
            flashcards={filteredFlashcards}
            topics={topics}
            isLoading={isLoading}
            darkMode={darkMode}
            onRowClick={handleRowClick}
            onDeleteFlashcard={handleDeleteFlashcard}
            onUpdateFlashcard={handleUpdateFlashcard}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
