import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import type { Flashcard } from '@/types/flashcard';
import { useCreateFlashcard } from '@/hooks/mutations';
import { useTopics } from '@/hooks/queries';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateFlashcardModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<Omit<Flashcard, 'id'>>();
  const { mutate, isPending } = useCreateFlashcard();
  const { data: topics, isLoading, isError } = useTopics();

  const onSubmit = (data: Omit<Flashcard, 'id'>) => {
    mutate(
      {
        question: data.question,
        answer: data.answer,
        difficulty: data.difficulty.toUpperCase() as Flashcard['difficulty'],
        topicId: parseInt(data.topicId as unknown as string, 10),
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Flashcard</DialogTitle>
      <DialogContent>
        {isLoading && <CircularProgress />}
        {isError && <Alert severity='error'>Failed to load topics</Alert>}

        {!isLoading && topics && (
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
              defaultValue=''
              {...register('topicId')}
            >
              {topics.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
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
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={isPending || isLoading}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
