import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Edit, Close } from '@mui/icons-material';
import type { Flashcard } from '@/types/flashcard';
import type { Topic } from '@/types/topic';

interface FlashcardHeaderProps {
  flashcard: Flashcard;
  topics: Topic[];
  isEditing: boolean;
  onEdit: () => void;
  onClose: () => void;
}

export default function FlashcardHeader({
  flashcard,
  topics,
  isEditing,
  onEdit,
  onClose,
}: FlashcardHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'HARD':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTopicName = (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic ? topic.name : 'Unknown';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant='h6'>
          {isEditing ? 'Edit Flashcard' : 'Flashcard'}
        </Typography>
        <Chip label={getTopicName(flashcard.topicId)} size='small' />
        <Chip
          label={flashcard.difficulty}
          color={getDifficultyColor(flashcard.difficulty)}
          size='small'
        />
      </Box>
      <Box>
        {!isEditing && (
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
}
