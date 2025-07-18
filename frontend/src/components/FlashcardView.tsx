import { Box, Typography } from '@mui/material';
import type { Flashcard } from '@/types/flashcard';

interface FlashcardViewProps {
  flashcard: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardView({
  flashcard,
  isFlipped,
  onFlip,
}: FlashcardViewProps) {
  return (
    <div
      className='flip-card w-full max-w-lg h-64 cursor-pointer'
      onClick={onFlip}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className='flip-card-front'>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant='h6'>{flashcard.question}</Typography>
          </Box>
        </div>
        <div className='flip-card-back'>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant='body1'>{flashcard.answer}</Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}
