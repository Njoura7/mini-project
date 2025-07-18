import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { useCreateFlashcard } from '@/hooks/mutations';
import { useTopics } from '@/hooks/queries';
import {
  flashcardCreateSchema,
  type FlashcardCreateFormData,
} from '@/schemas/flashcard';
import CreateFlashcardForm from './CreateFlashcardForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateFlashcardModal({ open, onClose }: Props) {
  const [formData, setFormData] = useState<FlashcardCreateFormData | null>(
    null
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutate, isPending } = useCreateFlashcard();
  const { data: topics, isLoading, isError } = useTopics();

  const handleClose = () => {
    setFormData(null);
    setIsFormValid(false);
    onClose();
  };

  const handleSave = () => {
    if (formData && isFormValid) {
      try {
        const validatedData = flashcardCreateSchema.parse(formData);
        mutate(validatedData, {
          onSuccess: () => {
            handleClose();
          },
        });
      } catch (error) {
        console.error('Validation failed:', error);
      }
    }
  };

  const handleFormDataChange = (
    data: FlashcardCreateFormData,
    isValid: boolean
  ) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>Create Flashcard</DialogTitle>

      <DialogContent sx={{ minHeight: '400px' }}>
        {isLoading && <CircularProgress />}
        {isError && <Alert severity='error'>Failed to load topics</Alert>}

        {!isLoading && topics && (
          <CreateFlashcardForm
            topics={topics}
            onFormDataChange={handleFormDataChange}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant='contained'
          startIcon={<Save />}
          disabled={!isFormValid || isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
