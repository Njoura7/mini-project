import { z } from 'zod';

const difficultyEnum = z
  .enum(['EASY', 'MEDIUM', 'HARD'])
  .refine((val) => ['EASY', 'MEDIUM', 'HARD'].includes(val), {
    message: 'Please select a valid difficulty',
  });

const commonFlashcardFields = {
  question: z
    .string()
    .min(5, 'Question should have at least 5 characters')
    .max(255, 'Question cannot exceed 255 characters')
    .refine((val) => val.trim().endsWith('?'), 'Question must end with a "?"'),
  answer: z
    .string()
    .min(1, 'Answer should have at least one characters')
    .max(255, 'Answer cannot exceed 255 characters'),
  difficulty: difficultyEnum,
};

export const flashcardEditSchema = z.object({
  ...commonFlashcardFields,
  topicId: z.number().min(1, 'Topic is required'),
});

export const flashcardCreateSchema = z.object({
  ...commonFlashcardFields,
  topicId: z.number().min(1, 'Please select a topic'),
});

export type FlashcardEditFormData = z.infer<typeof flashcardEditSchema>;
export type FlashcardCreateFormData = z.infer<typeof flashcardCreateSchema>;
