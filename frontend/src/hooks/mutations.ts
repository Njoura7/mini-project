import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Flashcard } from '@/types/flashcard';
//APIs
import {
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from '@/api/flashcards';
import { createTopic, deleteTopic } from '@/api/topics';

export function useCreateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Flashcard, 'id'>) => createFlashcard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });
}

export function useUpdateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Flashcard) => updateFlashcard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });
}

export function useDeleteFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFlashcard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });
}

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
};

export function useDeleteTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      // TODO: learn more about useQuery functionalities (the queryKey has some built in features,
      // for instance adding this line provoke the deletion of related flashcards to certain topic)
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
  });
}
