import { axiosClient } from './axios';
import type { Topic } from '@/types/topic';

export const fetchTopics = async (): Promise<Topic[]> => {
  const res = await axiosClient.get('/topics');
  return res.data;
};

export const fetchTopic = async (id: number): Promise<Topic[]> => {
  const res = await axiosClient.get(`/topics/${id}`);
  return res.data;
};

export const createTopic = async (name: string): Promise<Topic> => {
  const res = await axiosClient.post('/topics', { name });
  return res.data;
};

export const deleteTopic = async (id: number) => {
  await axiosClient.delete(`/topics/${id}`);
};
