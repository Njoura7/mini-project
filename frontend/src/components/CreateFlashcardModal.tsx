import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { Flashcard } from '@/types/flashcard';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (card: Flashcard) => void;
  topics: string[];
}

export default function CreateFlashcardModal({
  open,
  onClose,
  onSave,
  topics,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Flashcard>();

  // Update default values when the modal opens or when topics change
  useEffect(() => {
    if (open) {
      reset({
        question: '',
        answer: '',
        topic: topics[0] || '',
        difficulty: 'Easy',
      });
    }
  }, [open, topics, reset]);

  const onSubmit = (data: Omit<Flashcard, 'id'>) => {
    onSave({ ...data, id: `${Date.now()}` });
    console.table(data);
    reset(); // Clear the form
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Flashcard</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Question'
            fullWidth
            margin='normal'
            {...register('question')}
          />
          <TextField
            label='Answer'
            fullWidth
            margin='normal'
            {...register('answer')}
          />
          <TextField
            select
            label='Topic'
            fullWidth
            margin='normal'
            defaultValue={topics[0] || ''}
            {...register('topic')}
          >
            {topics.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label='Difficulty'
            fullWidth
            margin='normal'
            defaultValue='Easy'
            {...register('difficulty')}
          >
            {['Easy', 'Medium', 'Hard'].map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
