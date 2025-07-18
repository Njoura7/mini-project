import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type {
  ColDef,
  GridReadyEvent,
  RowClickedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import type { Flashcard } from '@/types/flashcard';
import { useDeleteFlashcard, useUpdateFlashcard } from '@/hooks/mutations';
import { useTopics } from '@/hooks/queries';
import DeleteButton from './DeleteButton';
import EditFlashcardModal from './EditFlashcardModal';

ModuleRegistry.registerModules([AllCommunityModule]);
const theme = themeQuartz
  .withParams(
    {
      backgroundColor: '#FFE8E0',
      foregroundColor: '#361008CC',
      browserColorScheme: 'light',
    },
    'light-red'
  )
  .withParams(
    {
      backgroundColor: '#201008',
      foregroundColor: '#FFFFFFCC',
      browserColorScheme: 'dark',
    },
    'dark-red'
  );

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
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { mutate: deleteCard, isPending: isDeleting } = useDeleteFlashcard();
  const { mutate: updateCard } = useUpdateFlashcard();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState<{
    id: number;
    question: string;
  } | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
    null
  );

  const topicIdToName = useMemo(() => {
    const map: Record<number, string> = {};
    topics?.forEach((topic) => {
      map[topic.id] = topic.name;
    });
    return map;
  }, [topics]);

  const handleDeleteClick = useCallback(
    (flashcard: { id: number; question: string }) => {
      setFlashcardToDelete(flashcard);
      setDeleteDialogOpen(true);
    },
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (flashcardToDelete) {
      deleteCard(flashcardToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setFlashcardToDelete(null);
        },
        onError: (error) => {
          console.error('Failed to delete flashcard:', error);
        },
      });
    }
  }, [flashcardToDelete, deleteCard]);

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setFlashcardToDelete(null);
  };

  const handleEditFlashcard = (flashcard: Flashcard) => {
    setFlashcardToEdit(flashcard);
    setEditModalOpen(true);
  };

  const handleSaveFlashcard = useCallback(
    (updatedFlashcard: Flashcard) => {
      updateCard(updatedFlashcard, {
        onSuccess: () => {
          setEditModalOpen(false);
          setFlashcardToEdit(null);
        },
        onError: (error) => {
          console.error('Failed to update flashcard:', error);
        },
      });
    },
    [updateCard]
  );

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setFlashcardToEdit(null);
  };

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
          const topicName = topicIdToName[params.value] || 'Unknown';
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
        // flex: 1,
        cellRenderer: (params: ICellRendererParams<Flashcard>) => {
          const flashcard = params.data as Flashcard;
          return (
            <div data-actions-cell onClick={(e) => e.stopPropagation()}>
              <DeleteButton
                flashcard={flashcard}
                onDeleteClick={handleDeleteClick}
              />
            </div>
          );
        },
      },
    ],
    [topicIdToName, topicsLoading, handleDeleteClick]
  );

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const handleRowClick = useCallback(
    (event: RowClickedEvent<Flashcard>) => {
      const target = event.event?.target as HTMLElement;
      if (target && target.closest('[data-actions-cell]')) {
        return;
      }
      if (event.data) {
        onRowClick(event.data);
        handleEditFlashcard(event.data);
      }
    },
    [onRowClick]
  );

  const handleGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

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
          suppressClickEdit
          rowSelection='single'
          getRowId={(params) => params.data.id.toString()}
          theme={theme}
        />
      </div>

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
          >
            {isDeleting ? 'Deleting...' : 'Delete Flashcard'}
          </Button>
        </DialogActions>
      </Dialog>

      <EditFlashcardModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        flashcard={flashcardToEdit}
        onSave={handleSaveFlashcard}
        topics={topics || []}
      />
    </Box>
  );
}
