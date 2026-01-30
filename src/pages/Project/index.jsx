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
  IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from 'components/MainCard';

// ✅ avatar images
import user1 from 'assets/images/users/avatar-1.png';
import user2 from 'assets/images/users/avatar-2.png';
import user3 from 'assets/images/users/avatar-3.png';
import user4 from 'assets/images/users/avatar-4.png';
import user5 from 'assets/images/users/avatar-5.png';


export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  // ✅ Assignee list
  const assignees = [
    { name: 'Alice Johnson', avatar: user1 },
    { name: 'Bob Smith', avatar: user2 },
    { name: 'Charlie Brown', avatar: user3 },
    { name: 'Diana Prince', avatar: user4 },
    { name: 'Ethan Hunt', avatar: user5 }
  ];

  // ✅ Tasks
  const [tasks, setTasks] = useState([
    { name: 'Bava water', estimate: '2d 4h', spent: '1d 2h', assignee: assignees[0], priority: 'Medium', status: 'Done' },
    { name: 'Mind Map', estimate: '1d 2h', spent: '4h 25m', assignee: assignees[1], priority: 'Medium', status: 'In Progress' },
    { name: 'UX sketches', estimate: '4d', spent: '2d 2h 20m', assignee: assignees[2], priority: 'Low', status: 'In Progress' }
  ]);

  // ✅ Form
  const [form, setForm] = useState({
    name: '',
    priority: 'Medium',
    description: '',
    assignee: assignees[0],
    estimate: '1d',
    spent: '0h',
    status: 'To Do'
  });

  const statusColor = {
    Done: 'success',
    'In Progress': 'info',
    'In Review': 'secondary',
    'To Do': 'default'
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE (Add / Edit)
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
      status: 'To Do'
    });

    handleClose();
  };

  // ✅ DELETE
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // ✅ EDIT
  const handleEdit = (task, index) => {
    setForm(task);
    setEditIndex(index);
    handleOpen();
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Project Tasks</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Add Project
        </Button>
      </Box>

      {/* Task List */}
      {tasks.map((task, index) => (
        <MainCard key={index} sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: 150 }}>{task.name}</Typography>
              <Typography sx={{ width: 100 }}>{task.estimate}</Typography>
              <Typography sx={{ width: 100 }}>{task.spent}</Typography>

              {/* ✅ Avatar */}
              <Avatar src={task.assignee.avatar} />

              <Typography color={task.priority === 'Low' ? 'green' : 'orange'}>
                {task.priority}
              </Typography>

              <Chip label={task.status} color={statusColor[task.status]} />
            </Box>

            {/* Actions */}
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
      ))}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Project' : 'Add Project'}</DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {/* Assignee with Avatar */}
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