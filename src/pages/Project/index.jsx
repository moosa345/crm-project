import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Stack,
  Divider
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';

const initialTasks = [
  {
    id: 1,
    name: 'Research',
    estimate: '2d 4h',
    spent: '1d 2h',
    assignee: avatar1,
    priority: 'Medium',
    status: 'Done'
  },
  {
    id: 2,
    name: 'Mind Map',
    estimate: '1d 2h',
    spent: '4h 25m',
    assignee: avatar2,
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 3,
    name: 'UX sketches',
    estimate: '4d',
    spent: '2d 2h',
    assignee: avatar1,
    priority: 'Low',
    status: 'In Progress'
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  // CREATE
  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: 'New Task',
        estimate: '1d',
        spent: '0h',
        assignee: avatar1,
        priority: 'Low',
        status: 'To Do'
      }
    ]);
  };

  // UPDATE
  const updateStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: 'Done' }
        : task
    ));
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addTask}
        >
          Add Task
        </Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" mb={2}>
        Active Tasks
      </Typography>

      {/* TASK LIST */}
      <Stack spacing={2}>
        {tasks.map(task => (
          <Card
            key={task.id}
            sx={{
              p: 2,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* LEFT */}
            <Box width="25%">
              <Typography variant="caption">Task Name</Typography>
              <Typography fontWeight={600}>{task.name}</Typography>
            </Box>

            <Box>
              <Typography variant="caption">Estimate</Typography>
              <Typography>{task.estimate}</Typography>
            </Box>

            <Box>
              <Typography variant="caption">Spent Time</Typography>
              <Typography>{task.spent}</Typography>
            </Box>

            <Box>
              <Typography variant="caption">Assignee</Typography>
              <Avatar src={task.assignee} />
            </Box>

            <Box>
              <Typography variant="caption">Priority</Typography>
              <Chip
                label={task.priority}
                color={task.priority === 'Low' ? 'success' : 'warning'}
                size="small"
              />
            </Box>

            <Box>
              <Chip
                label={task.status}
                color={
                  task.status === 'Done'
                    ? 'success'
                    : task.status === 'In Progress'
                    ? 'primary'
                    : 'default'
                }
                size="small"
              />
            </Box>

            {/* ACTIONS */}
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => updateStatus(task.id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
