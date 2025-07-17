export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  topicId: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}
