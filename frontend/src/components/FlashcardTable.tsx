import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { Flashcard } from '@/types/flashcard';
import { useDeleteFlashcard } from '@/hooks/mutations';
import type {
  ColDef,
  GridReadyEvent,
  RowClickedEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import { Box, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  //Tansquery
  const { mutate: deleteCard } = useDeleteFlashcard();
  // Column Definitions
  const [columnDefs] = useState<ColDef<Flashcard>[]>([
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
      cellRenderer: (params: ICellRendererParams<Flashcard>) => (
        <Chip
          label={params.value}
          color='primary'
          variant='outlined'
          size='small'
        />
      ),
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
          aria-label='delete'
          color='error'
          onClick={() => deleteCard(params.value)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

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
    </Box>
  );
}
