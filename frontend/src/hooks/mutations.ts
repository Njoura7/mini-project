import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFlashcard } from '@/api/flashcards';
import type { Flashcard } from '@/types/flashcard';

export function useCreateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Flashcard, 'id'>) => createFlashcard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });
}
