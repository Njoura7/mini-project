import { axiosClient } from './axios';
import type { Flashcard } from '@/types/flashcard';

// Get all cards
export const fetchFlashcards = async (): Promise<Flashcard[]> => {
  const response = await axiosClient.get('/cards');
  return response.data;
};

// Add a card
export const createFlashcard = async (data: Omit<Flashcard, 'id'>) => {
  const response = await axiosClient.post('/cards', data);
  return response.data;
};

// Delete a card
export const deleteFlashcard = async (id: number) => {
  await axiosClient.delete(`/cards/${id}`);
};
