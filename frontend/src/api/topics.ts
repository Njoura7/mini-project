import { axiosClient } from './axios';

export interface Topic {
  id: number;
  name: string;
}

export const fetchTopics = async (): Promise<Topic[]> => {
  const res = await axiosClient.get('/topics');
  return res.data;
};

export const createTopic = async (name: string): Promise<Topic> => {
  const res = await axiosClient.post('/topics', { name });
  return res.data;
};

// Delete a topic
export const deleteTopic = async (id: number) => {
  await axiosClient.delete(`/topics/${id}`);
};
