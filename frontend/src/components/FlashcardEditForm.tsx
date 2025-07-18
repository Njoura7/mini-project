import { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from '@mui/material';
import type { Flashcard } from '@/types/flashcard';
import type { Topic } from '@/types/topic';
import {
  flashcardEditSchema,
  type FlashcardEditFormData,
} from '@/schemas/flashcard';

interface FlashcardEditFormProps {
  flashcard: Flashcard;
  topics: Topic[];
  onFormDataChange: (data: FlashcardEditFormData, isValid: boolean) => void;
}

export default function FlashcardEditForm({
  flashcard,
  topics,
  onFormDataChange,
}: FlashcardEditFormProps) {
  const [formData, setFormData] = useState<FlashcardEditFormData>({
    question: flashcard.question,
    answer: flashcard.answer,
    topicId: flashcard.topicId,
    difficulty: flashcard.difficulty,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form data whenever it changes
  useEffect(() => {
    const result = flashcardEditSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      onFormDataChange(formData, true);
    } else if (result.error) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
      onFormDataChange(formData, false);
    }
  }, [formData, onFormDataChange]);

  const handleFieldChange = (
    field: keyof FlashcardEditFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <TextField
        fullWidth
        label='Question'
        multiline
        rows={3}
        value={formData.question}
        onChange={(e) => handleFieldChange('question', e.target.value)}
        error={!!errors.question}
        helperText={errors.question}
      />

      <TextField
        fullWidth
        label='Answer'
        multiline
        rows={4}
        value={formData.answer}
        onChange={(e) => handleFieldChange('answer', e.target.value)}
        error={!!errors.answer}
        helperText={errors.answer}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }} error={!!errors.topicId}>
          <InputLabel>Topic</InputLabel>
          <Select
            value={formData.topicId}
            label='Topic'
            onChange={(e) =>
              handleFieldChange('topicId', Number(e.target.value))
            }
          >
            {topics.map((topic) => (
              <MenuItem key={topic.id} value={topic.id}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
          {errors.topicId && <FormHelperText>{errors.topicId}</FormHelperText>}
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} error={!!errors.difficulty}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={formData.difficulty}
            label='Difficulty'
            onChange={(e) =>
              handleFieldChange(
                'difficulty',
                e.target.value as Flashcard['difficulty']
              )
            }
          >
            <MenuItem value='EASY'>Easy</MenuItem>
            <MenuItem value='MEDIUM'>Medium</MenuItem>
            <MenuItem value='HARD'>Hard</MenuItem>
          </Select>
          {errors.difficulty && (
            <FormHelperText>{errors.difficulty}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
}
