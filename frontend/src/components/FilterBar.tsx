
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { FilterList, AddCircleOutline } from '@mui/icons-material';
import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTopics } from '@/hooks/queries';
import { useCreateTopic } from '@/hooks/mutations';

interface FilterBarProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  flashcardCount: number;
}

export default function FilterBar({
  selectedTopic,
  onTopicChange,
  flashcardCount,
}: FilterBarProps) {
  // Tanstack Query
  const { data: topics = [] } = useTopics();
  const { mutate: createTopic } = useCreateTopic();

  const [newTopicName, setNewTopicName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    onTopicChange(event.target.value);
  };

  const handleCreateTopic = () => {
    if (!newTopicName.trim()) return;
    createTopic(newTopicName, {
      onSuccess: () => {
        setNewTopicName('');
        setDialogOpen(false);
      },
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Topic</InputLabel>
          <Select
            value={selectedTopic}
            label='Filter by Topic'
            onChange={handleChange}
          >
            <MenuItem value='All'>All Topics</MenuItem>
            {topics.map((topic) => (
              <MenuItem key={topic.id} value={String(topic.id)}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Chip
          icon={<FilterList />}
          label={`${flashcardCount} cards`}
          variant='outlined'
        />

        <Button
          variant='outlined'
          startIcon={<AddCircleOutline />}
          onClick={() => setDialogOpen(true)}
        >
          Add Topic
        </Button>
      </Box>

      {/* Create Topic Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a New Topic</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='Topic Name'
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTopic} variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
