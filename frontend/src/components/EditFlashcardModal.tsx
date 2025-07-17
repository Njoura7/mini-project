import { useState } from 'react';
import type { Flashcard } from '@/types/flashcard';
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

interface FlashcardModalProps {
  open: boolean;
  onClose: () => void;
  flashcard: Flashcard | null;
  onSave: (flashcard: Flashcard) => void;
  topics: string[];
}

export default function FlashcardModal({
  open,
  onClose,
  flashcard,
  onSave,
  topics,
}: FlashcardModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState<Flashcard | null>(null);

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
    setEditedCard(flashcard);
  };

  const handleSave = () => {
    if (editedCard) {
      onSave(editedCard);
      setIsEditing(false);
      setEditedCard(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCard(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  if (!flashcard) return null;

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
          <Chip label={flashcard.topicId} size='small' />
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
              value={editedCard?.question || ''}
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
              value={editedCard?.answer || ''}
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
                  value={editedCard?.topicId || ''}
                  label='Topic'
                  onChange={(e) =>
                    setEditedCard((prev) =>
                      prev ? { ...prev, topic: e.target.value } : null
                    )
                  }
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic} value={topic}>
                      {topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={editedCard?.difficulty || ''}
                  label='Difficulty'
                  onChange={(e) =>
                    setEditedCard((prev) =>
                      prev ? { ...prev, difficulty: e.target.value } : null
                    )
                  }
                >
                  <MenuItem value='Easy'>Easy</MenuItem>
                  <MenuItem value='Medium'>Medium</MenuItem>
                  <MenuItem value='Hard'>Hard</MenuItem>
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
