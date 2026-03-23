import { useState, useEffect } from "react";
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
  Grid
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MainCard from "components/MainCard";

import { useProjectStore } from "store/useProjectStore";

import user1 from "assets/images/users/avatar-1.png";
import user2 from "assets/images/users/avatar-2.png";
import user3 from "assets/images/users/avatar-3.png";
import user4 from "assets/images/users/avatar-4.png";
import user5 from "assets/images/users/avatar-5.png";

export default function ProjectPage() {

  const { projects, fetchProjects, addProject, updateProject, deleteProject } =
    useProjectStore();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);

  const assignees = [
    { name: "Alice Johnson", avatar: user1 },
    { name: "Bob Smith", avatar: user2 },
    { name: "Charlie Brown", avatar: user3 },
    { name: "Diana Prince", avatar: user4 },
    { name: "Ethan Hunt", avatar: user5 }
  ];

  const [form, setForm] = useState({
    name: "",
    priority: "Medium",
    description: "",
    assignee: assignees[0],
    status: "To Do"
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

    const data = {
      name: form.name,
      assignee: form.assignee.name,
      priority: form.priority,
      description: form.description,
      status: form.status
    };

    if (editId) {
      await updateProject(editId, data);
    } else {
      await addProject(data);
    }

    setForm({
      name: "",
      priority: "Medium",
      description: "",
      assignee: assignees[0],
      status: "To Do"
    });

    handleClose();
  };

  const handleEdit = (task) => {
    const selected = assignees.find((a) => a.name === task.assignee);

    setForm({
      name: task.name,
      priority: task.priority,
      description: task.description,
      assignee: selected || assignees[0],
      status: task.status
    });

    setEditId(task._id);
    handleOpen();
  };

  const confirmDelete = async () => {
    await deleteProject(selectedId);
    setDeleteOpen(false);
  };

  const statusColumns = ["To Do", "In Progress", "Done"];

  const statusColor = {
    "To Do": "default",
    "In Progress": "info",
    Done: "success"
  };

  return (
    <Box p={3}>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Project Board</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Add Task
        </Button>
      </Box>

      {/* JIRA STYLE BOARD */}
      <Grid container spacing={3}>

        {statusColumns.map((status) => (

          <Grid item xs={4} key={status}>

            <Typography variant="h6" mb={2}>
              {status}
            </Typography>

            {projects
              .filter((task) => task.status === status)
              .map((task) => (
                <MainCard key={task._id} sx={{ mb: 2 }}>

                  <Box display="flex" justifyContent="space-between">

                    <Box>

                      <Typography fontWeight="bold">
                        {task.name}
                      </Typography>

                      <Typography variant="body2">
                        {task.description}
                      </Typography>

                      <Box mt={1} display="flex" gap={1} alignItems="center">

                        <Avatar sx={{ width: 24, height: 24 }} />

                        <Chip
                          label={task.priority}
                          color="warning"
                          size="small"
                        />

                        <Chip
                          label={task.status}
                          color={statusColor[task.status]}
                          size="small"
                        />

                      </Box>

                    </Box>

                    <Box>

                      <IconButton onClick={() => handleEdit(task)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedId(task._id);
                          setDeleteOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>

                    </Box>

                  </Box>

                </MainCard>
              ))}

          </Grid>

        ))}

      </Grid>

      {/* ADD / EDIT DIALOG */}

      <Dialog open={open} onClose={handleClose} fullWidth>

        <DialogTitle>
          {editId ? "Edit Project" : "Add Project"}
        </DialogTitle>

        <DialogContent>

          <Box display="flex" flexDirection="column" gap={2} mt={1}>

            <TextField
              label="Project Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <TextField
              select
              label="Assignee"
              value={form.assignee.name}
              onChange={(e) => {
                const selected = assignees.find(
                  (a) => a.name === e.target.value
                );
                setForm({ ...form, assignee: selected });
              }}
            >
              {assignees.map((a) => (
                <MenuItem key={a.name} value={a.name}>
                  {a.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
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
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>

            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={form.description}
              onChange={handleChange}
            />

          </Box>

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            {editId ? "Update" : "Save"}
          </Button>

        </DialogActions>

      </Dialog>

      {/* DELETE CONFIRMATION */}

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>

        <DialogTitle>Delete Project?</DialogTitle>

        <DialogActions>

          <Button onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>

          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}