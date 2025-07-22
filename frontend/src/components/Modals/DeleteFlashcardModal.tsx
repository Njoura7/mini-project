import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface DeleteFlashcardDialogProps {
  open: boolean;
  flashcardToDelete: { id: number; question: string } | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteFlashcardDialog({
  open,
  flashcardToDelete,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteFlashcardDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth='sm' fullWidth>
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
        <Button onClick={onCancel} variant='outlined' disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          variant='contained'
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Flashcard'} // MUI button has built-in loading state.
        </Button>
      </DialogActions>
    </Dialog>
  );
}
