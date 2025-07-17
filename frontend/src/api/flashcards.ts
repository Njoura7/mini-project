import { axiosClient } from './axios';
import type { Flashcard } from '@/types/flashcard';

export const createFlashcard = async (data: Omit<Flashcard, 'id'>) => {
  const response = await axiosClient.post<Flashcard>('/cards', data);
  return response.data;
};
