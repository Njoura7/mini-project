import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { Flashcard } from '@/types/flashcard';
import { useDeleteFlashcard } from '@/hooks/mutations';
import { useTopics } from '@/hooks/queries';
import type {
  ColDef,
  GridReadyEvent,
  RowClickedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import {
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface FlashcardTableProps {
  flashcards: Flashcard[];
  onRowClick: (flashcard: Flashcard) => void;
  darkMode: boolean;
}

export default function FlashcardTable({
  flashcards,
  onRowClick,
  darkMode,
}: FlashcardTableProps) {
  // Tanstack Query
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { mutate: deleteCard, isPending: isDeleting } = useDeleteFlashcard();

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState<{
    id: number;
    question: string;
  } | null>(null);

  // Create topic ID → name map
  const topicIdToName = useMemo(() => {
    const map: Record<number, string> = {};
    if (topics) {
      topics.forEach((topic) => {
        map[topic.id] = topic.name;
      });
    }
    return map;
  }, [topics]);

  // Delete handlers
  const handleDeleteClick = (flashcard: { id: number; question: string }) => {
    setFlashcardToDelete(flashcard);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (flashcardToDelete) {
      deleteCard(flashcardToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setFlashcardToDelete(null);
        },
        onError: (error) => {
          console.error('Failed to delete flashcard:', error);
          // Keep dialog open to show error state
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setFlashcardToDelete(null);
  };

  // Column Definitions - recreate when topics change
  const columnDefs = useMemo<ColDef<Flashcard>[]>(
    () => [
      {
        headerName: 'Question',
        field: 'question',
        flex: 2,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: 'Topic',
        field: 'topicId',
        width: 140,
        cellRenderer: (params: ICellRendererParams<Flashcard>) => {
          const topicId = params.value;

          // Handle loading state
          if (topicsLoading) {
            return (
              <Chip
                label='Loading...'
                color='default'
                variant='outlined'
                size='small'
              />
            );
          }

          // Get topic name from map
          const topicName = topicIdToName[topicId] || 'Unknown';

          return (
            <Chip
              label={topicName}
              color='primary'
              variant='outlined'
              size='small'
            />
          );
        },
      },
      {
        headerName: 'Difficulty',
        field: 'difficulty',
        width: 140,
        cellRenderer: (params: ICellRendererParams<Flashcard>) => {
          const difficultyColorMap: Record<
            Flashcard['difficulty'],
            'success' | 'warning' | 'error'
          > = {
            EASY: 'success',
            MEDIUM: 'warning',
            HARD: 'error',
          };
          const color =
            difficultyColorMap[params.value as Flashcard['difficulty']];
          return <Chip label={params.value} color={color} size='small' />;
        },
      },
      {
        headerName: 'Actions',
        field: 'id',
        width: 100,
        cellRenderer: (params: ICellRendererParams<Flashcard>) => (
          <IconButton
            aria-label='delete flashcard'
            color='error'
            size='small'
            onClick={() => {
              handleDeleteClick({
                id: params.value,
                question: params.data?.question || 'Unknown question',
              });
            }}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText',
                transform: 'scale(1.1)',
              },
            }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        ),
      },
    ],
    [topicIdToName, topicsLoading, handleDeleteClick]
  );

  // Default Column Behavior
  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Grid Events
  const handleRowClick = (event: RowClickedEvent) => {
    onRowClick(event.data);
  };

  const handleGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  // Show loading state if topics are still loading
  if (topicsLoading) {
    return (
      <Box
        sx={{
          height: '600px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading topics...
      </Box>
    );
  }

  return (
    <Box sx={{ height: '600px', width: '100%' }}>
      <div
        className={darkMode ? 'ag-theme-material-dark' : 'ag-theme-material'}
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          rowData={flashcards}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
          onGridReady={handleGridReady}
          rowHeight={60}
          headerHeight={70}
          animateRows
          rowSelection={{ mode: 'singleRow' }}
          theme='legacy'
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color='warning' />
          Delete Flashcard
        </DialogTitle>
        <DialogContent>
          <Alert severity='warning' sx={{ mb: 2 }}>
            <AlertTitle>This action cannot be undone</AlertTitle>
            You are about to permanently delete this flashcard from your
            collection.
          </Alert>

          <Typography variant='body1' sx={{ mb: 1 }}>
            Are you sure you want to delete this flashcard?
          </Typography>

          <Box
            sx={{
              p: 2,
              backgroundColor: 'background.default',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              Question:
            </Typography>
            <Typography variant='body1' sx={{ fontWeight: 500 }}>
              {flashcardToDelete?.question}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCancelDelete}
            variant='outlined'
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color='error'
            variant='contained'
            disabled={isDeleting}
            startIcon={isDeleting ? null : <DeleteIcon />}
          >
            {isDeleting ? 'Deleting...' : 'Delete Flashcard'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
