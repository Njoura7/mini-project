'use client';

import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useTopics } from '@/hooks/queries';
import { useDeleteTopic } from '@/hooks/mutations';

interface TopicManagerProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export default function TopicManager({
  selectedTopic,
  onTopicChange,
}: TopicManagerProps) {
  // Tanstack Query
  const { data: topics = [] } = useTopics();
  const { mutate: deleteTopic } = useDeleteTopic();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (topic: { id: number; name: string }) => {
    setTopicToDelete(topic);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (topicToDelete) {
      deleteTopic(topicToDelete.id, {
        onSuccess: () => {
          // If we're deleting the currently selected topic, reset to "All"
          if (selectedTopic === String(topicToDelete.id)) {
            onTopicChange('All');
          }
          setDeleteDialogOpen(false);
          setTopicToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setTopicToDelete(null);
  };

  if (topics.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Topic Management Section */}
      <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography variant='subtitle2' sx={{ mb: 1.5, fontWeight: 600 }}>
          Manage Topics
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
          {topics.map((topic) => {
            const isSelected = selectedTopic === String(topic.id);

            return (
              <Chip
                key={topic.id}
                label={topic.name}
                variant={isSelected ? 'filled' : 'outlined'}
                color={isSelected ? 'primary' : 'default'}
                onClick={() => onTopicChange(String(topic.id))}
                onDelete={() => handleDeleteClick(topic)}
                deleteIcon={<Delete />}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  // Base styles
                  ...(isSelected && {
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      color: 'primary.contrastText',
                    },
                  }),
                  // Unselected chip hover styles
                  ...(!isSelected && {
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }),
                  // Delete icon hover styles
                  '& .MuiChip-deleteIcon': {
                    color: isSelected
                      ? 'primary.contrastText'
                      : 'action.active',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': {
                      color: 'error.main',
                    },
                  },
                }}
              />
            );
          })}
        </Stack>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Topic</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the topic "{topicToDelete?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
