import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Flashcard } from '@/types/flashcard';

interface DeleteButtonProps {
  flashcard: Flashcard;
  onDeleteClick: (flashcard: { id: number; question: string }) => void;
}

export default function DeleteButton({
  flashcard,
  onDeleteClick,
}: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents row click
    e.preventDefault();
    onDeleteClick({ id: flashcard.id, question: flashcard.question });
  };

  return (
    <IconButton
      aria-label='delete flashcard'
      color='error'
      size='small'
      onClick={handleClick}
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'error.light',
          color: 'error.contrastText',
          transform: 'scale(1.1)',
        },
      }}
    >
      <DeleteIcon fontSize='small' />
    </IconButton>
  );
}
