'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface FilterBarProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  topics: string[];
  flashcardCount: number;
}

export default function FilterBar({
  selectedTopic,
  onTopicChange,
  topics,
  flashcardCount,
}: FilterBarProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onTopicChange(event.target.value);
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Topic</InputLabel>
        <Select
          value={selectedTopic}
          label='Filter by Topic'
          onChange={handleChange}
        >
          <MenuItem value='All'>All Topics</MenuItem>
          {topics.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Chip
        icon={<FilterList />}
        label={`${flashcardCount} cards`}
        variant='outlined'
      />
    </Box>
  );
}
