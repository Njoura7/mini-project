import { useQuery } from '@tanstack/react-query';
// APIs
import { fetchFlashcards } from '@/api/flashcards';
import { fetchTopics, fetchTopic } from '@/api/topics';

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

export const useTopic = (id: number) => {
  return useQuery({
    queryKey: ['topic', id],
    queryFn: () => fetchTopic(id),
    enabled: !!id, // Only fetch when ID is available
  });
};
