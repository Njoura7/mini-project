import { useCallback } from 'react';
import { DeleteButton } from './DeleteButton';

interface FlashcardActionsCellProps {
  flashcard: { id: number; question: string };
  onDeleteClick: (flashcard: { id: number; question: string }) => void;
}

export function FlashcardActionsCell({
  flashcard,
  onDeleteClick,
}: FlashcardActionsCellProps) {
  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDeleteClick(flashcard);
    },
    [flashcard, onDeleteClick]
  );

  return (
    <div data-actions-cell>
      <DeleteButton onClick={handleDeleteClick} />
    </div>
  );
}
