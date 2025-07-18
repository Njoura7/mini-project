import { useMemo, useState, useCallback } from 'react';
import type { Flashcard } from '@/types/flashcard';
import type { Topic } from '@/types/topic';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type {
  ColDef,
  GridReadyEvent,
  RowClickedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Box, Chip } from '@mui/material';
import { DeleteFlashcardDialog } from './Modals/DeleteFlashcardModal';
import { FlashcardActionsCell } from './FlashcardActionsCell';
import EditFlashcardModal from './Modals/EditFlashcardModal';

ModuleRegistry.registerModules([AllCommunityModule]);

interface FlashcardTableProps {
  flashcards: Flashcard[];
  topics: Topic[];
  isLoading: boolean;
  darkMode: boolean;
  onRowClick: (flashcard: Flashcard) => void;
  onDeleteFlashcard: (id: number) => void;
  onUpdateFlashcard: (flashcard: Flashcard) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

export default function FlashcardTable({
  flashcards,
  topics,
  isLoading,
  darkMode,
  onRowClick,
  onDeleteFlashcard,
  onUpdateFlashcard,
  isDeleting = false,
  isUpdating = false,
}: FlashcardTableProps) {
  // State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState<{
    id: number;
    question: string;
  } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
    null
  );

  // Grid theme configuration
  const gridThemeConfig = useMemo(
    () => ({
      height: '100%',
      width: '100%',
    }),
    []
  );

  // Memoized mappings and configurations
  const topicIdToName = useMemo(() => {
    return topics.reduce<Record<number, string>>((map, topic) => {
      map[topic.id] = topic.name;
      return map;
    }, {});
  }, [topics]);

  const difficultyColorMap = useMemo(() => {
    return {
      EASY: 'success',
      MEDIUM: 'warning',
      HARD: 'error',
    } as const;
  }, []);

  // Handlers
  const handleDeleteClick = useCallback(
    (flashcard: { id: number; question: string }) => {
      setFlashcardToDelete(flashcard);
      setDeleteDialogOpen(true);
    },
    []
  );

  const handleConfirmDelete = useCallback(() => {
    if (flashcardToDelete) {
      onDeleteFlashcard(flashcardToDelete.id);
      setDeleteDialogOpen(false);
      setFlashcardToDelete(null);
    }
  }, [flashcardToDelete, onDeleteFlashcard]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setFlashcardToDelete(null);
  }, []);

  const handleEditFlashcard = useCallback((flashcard: Flashcard) => {
    setFlashcardToEdit(flashcard);
    setEditModalOpen(true);
  }, []);

  const handleSaveFlashcard = useCallback(
    (updatedFlashcard: Flashcard) => {
      onUpdateFlashcard(updatedFlashcard);
      setEditModalOpen(false);
      setFlashcardToEdit(null);
    },
    [onUpdateFlashcard]
  );

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
    setFlashcardToEdit(null);
  }, []);

  const handleRowClick = useCallback(
    (event: RowClickedEvent<Flashcard>) => {
      const target = event.event?.target as HTMLElement;
      if (target?.closest('[data-actions-cell]')) return;
      if (event.data) {
        onRowClick(event.data);
        handleEditFlashcard(event.data);
      }
    },
    [onRowClick, handleEditFlashcard]
  );

  const handleGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

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
          if (isLoading) {
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
          const color =
            difficultyColorMap[params.value as Flashcard['difficulty']];
          return <Chip label={params.value} color={color} size='small' />;
        },
      },
      {
        headerName: 'Actions',
        cellRenderer: (params: ICellRendererParams<Flashcard>) => (
          <FlashcardActionsCell
            flashcard={params.data!}
            onDeleteClick={handleDeleteClick}
          />
        ),
      },
    ],
    [topicIdToName, isLoading, handleDeleteClick, difficultyColorMap]
  );

  if (isLoading) {
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
        className={`ag-theme-material ${darkMode ? 'dark-mode' : ''}`}
        style={gridThemeConfig}
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
          theme='legacy'
        />
      </div>

      <DeleteFlashcardDialog
        open={deleteDialogOpen}
        flashcardToDelete={flashcardToDelete}
        isDeleting={isDeleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <EditFlashcardModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        flashcard={flashcardToEdit}
        onSave={handleSaveFlashcard}
        topics={topics}
        isUpdating={isUpdating}
      />
    </Box>
  );
}
