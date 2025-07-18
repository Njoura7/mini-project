import { useState, useEffect, useCallback } from 'react';
import { TextField, MenuItem, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchTopic } from '@/api/topics';
import { ZodError } from 'zod';
import {
  flashcardCreateSchema,
  type FlashcardCreateFormData,
} from '@/schemas/flashcard';
import type { Topic } from '@/types/topic';

interface CreateFlashcardFormProps {
  topics: Topic[];
  onFormDataChange: (data: FlashcardCreateFormData, isValid: boolean) => void;
}

export default function CreateFlashcardForm({
  topics,
  onFormDataChange,
}: CreateFlashcardFormProps) {
  const [formData, setFormData] = useState<FlashcardCreateFormData>({
    question: '',
    answer: '',
    topicId: 0,
    difficulty: 'EASY',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FlashcardCreateFormData, string>>
  >({});

  // Memoized form validation
  const validateForm = useCallback((data: FlashcardCreateFormData) => {
    try {
      flashcardCreateSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = error.issues.reduce((acc, issue) => {
          const field = issue.path[0] as keyof FlashcardCreateFormData;
          return { ...acc, [field]: issue.message };
        }, {} as typeof errors);
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  }, []);

  // Fetch topic details only when needed
  const { isFetching: isTopicFetching } = useQuery({
    queryKey: ['topic', formData.topicId],
    queryFn: () => {
      if (formData.topicId <= 0) return null;
      return fetchTopic(formData.topicId);
    },
    enabled: formData.topicId > 0, // Only fetch if we have a valid ID
    staleTime: Infinity, // Topic data doesn't change often
  });

  // Handle field changes with proper validation
  const handleChange = useCallback(
    (field: keyof FlashcardCreateFormData, value: string | number) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      const isValid = validateForm(newData);
      onFormDataChange(newData, isValid);
    },
    [formData, onFormDataChange, validateForm]
  );

  // Initial validation on mount
  useEffect(() => {
    const isValid = validateForm(formData);
    onFormDataChange(formData, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component='form' noValidate sx={{ mt: 1 }}>
      <TextField
        label='Question'
        value={formData.question}
        onChange={(e) => handleChange('question', e.target.value)}
        error={!!errors.question}
        helperText={errors.question || ' '} // Maintain consistent spacing
        fullWidth
        margin='normal'
        required
        inputProps={{ 'data-testid': 'question-input' }}
      />

      <TextField
        label='Answer'
        value={formData.answer}
        onChange={(e) => handleChange('answer', e.target.value)}
        error={!!errors.answer}
        helperText={errors.answer || ' '}
        fullWidth
        margin='normal'
        multiline
        minRows={3}
        required
        inputProps={{ 'data-testid': 'answer-input' }}
      />

      <TextField
        select
        label='Topic'
        value={formData.topicId}
        onChange={(e) => handleChange('topicId', Number(e.target.value))}
        error={!!errors.topicId}
        helperText={
          errors.topicId ||
          (isTopicFetching ? <CircularProgress size={20} /> : ' ')
        }
        fullWidth
        margin='normal'
        required
        SelectProps={{
          displayEmpty: true,
          renderValue: (value) =>
            value === 0
              ? 'Select a topic'
              : topics.find((t) => t.id === value)?.name || 'Loading...',
        }}
        inputProps={{ 'data-testid': 'topic-select' }}
      >
        <MenuItem value={0} disabled>
          Select a topic
        </MenuItem>
        {topics.map((topic) => (
          <MenuItem key={topic.id} value={topic.id}>
            {topic.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label='Difficulty'
        value={formData.difficulty}
        onChange={(e) => handleChange('difficulty', e.target.value)}
        error={!!errors.difficulty}
        helperText={errors.difficulty || ' '}
        fullWidth
        margin='normal'
        required
        inputProps={{ 'data-testid': 'difficulty-select' }}
      >
        {['EASY', 'MEDIUM', 'HARD'].map((level) => (
          <MenuItem key={level} value={level}>
            {level.charAt(0) + level.slice(1).toLowerCase()}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
