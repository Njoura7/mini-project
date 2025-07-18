// DeleteButton.tsx
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Tooltip title='Delete flashcard'>
      <IconButton onClick={onClick} color='error' aria-label='delete flashcard'>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
