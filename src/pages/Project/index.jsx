import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  IconButton,
  Stack
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import TimelineIcon from '@mui/icons-material/Timeline';

import MainCard from 'components/MainCard';

// avatar images
import user1 from 'assets/images/users/avatar-1.png';
import user2 from 'assets/images/users/avatar-2.png';
import user3 from 'assets/images/users/avatar-3.png';
import user4 from 'assets/images/users/avatar-4.png';
import user5 from 'assets/images/users/avatar-5.png';

// Timeline / Gantt component
function TasksTimeline({ tasks, totalDays = 20 }) {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <Box overflow="auto">
      {/* Header */}
      <Box display="flex" mb={1}>
        <Box sx={{ width: 200 }} />
        {days.map(d => (
          <Box key={d} sx={{ width: 30, textAlign: 'center', fontSize: 12 }}>
            {d}
          </Box>
        ))}
      </Box>

      {/* Task rows */}
      {tasks.map((task, idx) => (
        <Box key={idx} display="flex" alignItems="center" mb={0.5}>
          <Box sx={{ width: 200, fontSize: 14 }}>{task.name}</Box>
          {days.map(day => (
            <Box
              key={day}
              sx={{
                width: 30,
                height: 20,
                border: '1px solid #eee',
                backgroundColor:
                  day >= task.start && day <= task.end ? '#85C1E9' : 'transparent'
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [view, setView] = useState('list'); // list | grid | timeline

  const assignees = [
    { name: 'Alice Johnson', avatar: user1 },
    { name: 'Bob Smith', avatar: user2 },
    { name: 'Charlie Brown', avatar: user3 },
    { name: 'Diana Prince', avatar: user4 },
    { name: 'Ethan Hunt', avatar: user5 }
  ];

  // Tasks with timeline info
  const [tasks, setTasks] = useState([
    { name: 'Bava water', estimate: '2d 4h', spent: '1d 2h', assignee: assignees[0], priority: 'Medium', status: 'Done', start: 1, end: 3 },
    { name: 'just bake', estimate: '1d 2h', spent: '4h 25m', assignee: assignees[1], priority: 'Medium', status: 'In Progress', start: 3, end: 4 },
    { name: 'UX Login + Registration', estimate: '2d', spent: '3h 15m', assignee: assignees[3], priority: 'Low', status: 'To Do', start: 5, end: 8 },
    { name: 'UI Login + Registration', estimate: '1d 2h', spent: '4h', assignee: assignees[0], priority: 'Medium', status: 'In Review', start: 5, end: 10 },
    { name: 'moosa + uniqueservices', estimate: '6h', spent: '0h', assignee: assignees[2], priority: 'Low', status: 'To Do', start: 11, end: 13 },
    { name: 'Afeef + blaire.in', estimate: '8h', spent: '0h', assignee: assignees[4], priority: 'Medium', status: 'To Do', start: 14, end: 14 },
  ]);

  const [form, setForm] = useState({
    name: '',
    priority: 'Medium',
    description: '',
    assignee: assignees[0],
    estimate: '1d',
    spent: '0h',
    status: 'To Do',
    start: 1,
    end: 1
  });

  const statusColor = {
    Done: 'success',
    'In Progress': 'info',
    'In Review': 'secondary',
    'To Do': 'default'
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = form;
      setTasks(updated);
    } else {
      setTasks([...tasks, form]);
    }

    setForm({
      name: '',
      priority: 'Medium',
      description: '',
      assignee: assignees[0],
      estimate: '1d',
      spent: '0h',
      status: 'To Do',
      start: 1,
      end: 1
    });

    handleClose();
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (task, index) => {
    setForm(task);
    setEditIndex(index);
    handleOpen();
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tasks</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => setView('list')}>
            <ViewListIcon />
          </IconButton>

          <IconButton onClick={() => setView('grid')}>
            <ViewModuleIcon />
          </IconButton>

          <IconButton onClick={() => setView('timeline')}>
            <TimelineIcon />
          </IconButton>

          

          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            Add Task
          </Button>
        </Stack>
      </Box>

      {/* Views */}
      {view === 'list' && (
        tasks.map((task, index) => (
          <MainCard key={index} sx={{ mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={3}>
                <Typography sx={{ width: 150 }}>{task.name}</Typography>
                <Typography sx={{ width: 100 }}>{task.estimate}</Typography>
                <Typography sx={{ width: 100 }}>{task.spent}</Typography>

                <Avatar src={task.assignee.avatar} />

                <Typography color={task.priority === 'Low' ? 'green' : 'orange'}>
                  {task.priority}
                </Typography>

                <Chip label={task.status} color={statusColor[task.status]} />
              </Box>

              <Box>
                <IconButton color="primary" onClick={() => handleEdit(task, index)}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </MainCard>
        ))
      )}

      {view === 'grid' && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {tasks.map((task, index) => (
            <MainCard key={index} sx={{ width: 260, p: 2 }}>
              <Typography variant="caption">TS0001245</Typography>
              <Typography fontWeight={600} mb={1}>
                {task.name}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Chip label={task.estimate} size="small" />
                <Avatar src={task.assignee.avatar} />
              </Box>
            </MainCard>
          ))}
        </Box>
      )}

      {view === 'timeline' && (
        <TasksTimeline tasks={tasks} />
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Task' : 'Add Task'}</DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <TextField
              select
              fullWidth
              label="Assignee"
              value={form.assignee.name}
              onChange={(e) => {
                const selected = assignees.find(a => a.name === e.target.value);
                setForm({ ...form, assignee: selected });
              }}
            >
              {assignees.map((a) => (
                <MenuItem key={a.name} value={a.name}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={a.avatar} />
                    {a.name}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
            />

            <Box display="flex" gap={2}>
              <TextField
                label="Start Day"
                type="number"
                name="start"
                value={form.start}
                onChange={handleChange}
              />
              <TextField
                label="End Day"
                type="number"
                name="end"
                value={form.end}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editIndex !== null ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

