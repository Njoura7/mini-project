import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import type { Flashcard } from '@/types/flashcard';
import type { Topic } from '@/types/topic';
import type { FlashcardEditFormData } from '@/schemas/flashcard';
import FlashcardView from './FlashcardView';
import FlashcardEditForm from './FlashcardEditForm';
import FlashcardHeader from './FlashcardHeader';

interface EditFlashcardModalProps {
  open: boolean;
  onClose: () => void;
  flashcard: Flashcard | null;
  onSave: (flashcard: Flashcard) => void;
  topics: Topic[];
}

export default function EditFlashcardModal({
  open,
  onClose,
  flashcard,
  onSave,
  topics,
}: EditFlashcardModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FlashcardEditFormData | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Reset state when flashcard changes
  useEffect(() => {
    if (flashcard) {
      setIsFlipped(false);
      setIsEditing(false);
      setFormData(null);
      setIsFormValid(false);
    }
  }, [flashcard]);

  const handleClose = () => {
    setIsFlipped(false);
    setIsEditing(false);
    setFormData(null);
    setIsFormValid(false);
    onClose();
  };

  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (flashcard && formData && isFormValid) {
      const updatedFlashcard: Flashcard = {
        ...flashcard,
        ...formData,
      };
      onSave(updatedFlashcard);
      setIsEditing(false);
      setFormData(null);
      setIsFormValid(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
    setIsFormValid(false);
  };

  const handleFormDataChange = (
    data: FlashcardEditFormData,
    isValid: boolean
  ) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  if (!flashcard) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <FlashcardHeader
          flashcard={flashcard}
          topics={topics}
          isEditing={isEditing}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEditing ? (
          <FlashcardEditForm
            flashcard={flashcard}
            topics={topics}
            onFormDataChange={handleFormDataChange}
          />
        ) : (
          <FlashcardView
            flashcard={flashcard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        )}
      </DialogContent>

      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleCancel} startIcon={<Cancel />}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant='contained'
              startIcon={<Save />}
              disabled={!isFormValid}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleClose}>Close</Button>
            {!isFlipped && (
              <Button onClick={handleFlip} variant='contained'>
                Reveal Answer
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
