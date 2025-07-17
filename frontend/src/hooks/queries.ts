import { useQuery } from '@tanstack/react-query';
// APIs
import { fetchFlashcards } from '@/api/flashcards';
import { fetchTopics } from '@/api/topics';

export const useFlashcards = () => {
  return useQuery({
    queryKey: ['flashcards'],
    queryFn: fetchFlashcards,
  });
};

export const useTopics = () =>
  useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  });
