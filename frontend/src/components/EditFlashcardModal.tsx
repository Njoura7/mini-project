import { useState, useEffect } from 'react';
import type { Flashcard } from '@/types/flashcard';
import type { Topic } from '@/types/topic'; // Assuming you have this type
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { Edit, Save, Cancel, Close } from '@mui/icons-material';

interface EditFlashcardModalProps {
  open: boolean;
  onClose: () => void;
  flashcard: Flashcard | null;
  onSave: (flashcard: Flashcard) => void;
  topics: Topic[]; // Changed to accept full topic objects instead of just names
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
  const [editedCard, setEditedCard] = useState<Flashcard | null>(null);

  // Reset state when flashcard changes
  useEffect(() => {
    if (flashcard) {
      setEditedCard({ ...flashcard });
      setIsFlipped(false);
      setIsEditing(false);
    }
  }, [flashcard]);

  const handleClose = () => {
    setIsFlipped(false);
    setIsEditing(false);
    setEditedCard(null);
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
    if (editedCard) {
      onSave(editedCard);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCard(flashcard ? { ...flashcard } : null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'HARD':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTopicName = (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic ? topic.name : 'Unknown';
  };

  if (!flashcard || !editedCard) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='h6'>
            {isEditing ? 'Edit Flashcard' : 'Flashcard'}
          </Typography>
          <Chip label={getTopicName(flashcard.topicId)} size='small' />
          <Chip
            label={flashcard.difficulty}
            color={getDifficultyColor(flashcard.difficulty)}
            size='small'
          />
        </Box>
        <Box>
          {!isEditing && (
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          )}
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label='Question'
              multiline
              rows={3}
              value={editedCard.question || ''}
              onChange={(e) =>
                setEditedCard((prev) =>
                  prev ? { ...prev, question: e.target.value } : null
                )
              }
            />
            <TextField
              fullWidth
              label='Answer'
              multiline
              rows={4}
              value={editedCard.answer || ''}
              onChange={(e) =>
                setEditedCard((prev) =>
                  prev ? { ...prev, answer: e.target.value } : null
                )
              }
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Topic</InputLabel>
                <Select
                  value={editedCard.topicId || ''}
                  label='Topic'
                  onChange={(e) =>
                    setEditedCard((prev) =>
                      prev ? { ...prev, topicId: Number(e.target.value) } : null
                    )
                  }
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={editedCard.difficulty || ''}
                  label='Difficulty'
                  onChange={(e) =>
                    setEditedCard((prev) =>
                      prev
                        ? {
                            ...prev,
                            difficulty: e.target
                              .value as Flashcard['difficulty'],
                          }
                        : null
                    )
                  }
                >
                  <MenuItem value='EASY'>Easy</MenuItem>
                  <MenuItem value='MEDIUM'>Medium</MenuItem>
                  <MenuItem value='HARD'>Hard</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        ) : (
          <div
            className='flip-card w-full max-w-lg h-64 cursor-pointer'
            onClick={handleFlip}
          >
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
              <div className='flip-card-front'>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant='h6'>{flashcard.question}</Typography>
                </Box>
              </div>
              <div className='flip-card-back'>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant='body1'>{flashcard.answer}</Typography>
                </Box>
              </div>
            </div>
          </div>
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
