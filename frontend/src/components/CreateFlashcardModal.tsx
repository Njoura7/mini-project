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
import { useCreateFlashcard } from '@/hooks/mutations';

interface Props {
  open: boolean;
  onClose: () => void;
  topics: string[];
}

export default function CreateFlashcardModal({ open, onClose, topics }: Props) {
  const { register, handleSubmit, reset } = useForm<Omit<Flashcard, 'id'>>();

  const { mutate, isPending } = useCreateFlashcard();

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
    mutate(data, {
      onSuccess: () => {
        console.table(data);
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Flashcard</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='question'
            label='Question'
            fullWidth
            margin='normal'
            {...register('question')}
          />
          <TextField
            id='answer'
            label='Answer'
            fullWidth
            margin='normal'
            {...register('answer')}
          />
          <TextField
            id='topic'
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
            id='difficulty'
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
        <Button
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
