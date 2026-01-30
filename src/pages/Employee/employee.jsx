import { useState } from 'react';

// MUI
import {
  Box,
  Card,
  Typography,
  Avatar,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Avatars
const avatar1 = "/assets/images/users/avatar_1.png";
const avatar2 = "/assets/images/users/avatar_2.png";
const avatar3 = "/assets/images/users/avatar_3.png";

// ==============================|| INITIAL DATA ||============================== //

const initialEmployees = [
  {
    id: 1,
    name: 'Evan Yates',
    avatar: avatar1,
    email: 'evanyates@gmail.com',
    gender: 'Male',
    birthday: 'Apr 12, 1995',
    age: 25,
    position: 'UI/UX Designer',
    level: 'Middle'
  },
  {
    id: 2,
    name: 'Lenora Fowler',
    avatar: avatar2,
    email: 'eravi@ec.gov',
    gender: 'Female',
    birthday: 'Apr 28, 1998',
    age: 23,
    position: 'UI/UX Designer',
    level: 'Junior'
  },
  {
    id: 3,
    name: 'Nishaf Bawa',
    avatar: avatar3,
    email: 'bawa@gmail.com',
    gender: 'Male',
    birthday: 'Apr 28, 1998',
    age: 23,
    position: 'UI/UX Designer',
    level: 'Junior'
  }
];

// ==============================|| EMPLOYEES PAGE ||============================== //

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({});

  // ---------- MENU ----------
  const openMenu = (event, emp) => {
    setMenuAnchor(event.currentTarget);
    setSelected(emp);
  };

  const closeMenu = () => setMenuAnchor(null);

  // ---------- CRUD ----------
  const openAdd = () => {
    setForm({});
    setOpenDialog(true);
  };

  const openEdit = () => {
    setForm(selected);
    setOpenDialog(true);
    closeMenu();
  };

  const handleDelete = () => {
    setEmployees(employees.filter((e) => e.id !== selected.id));
    closeMenu();
  };

  const handleSave = () => {
    if (form.id) {
      setEmployees(employees.map((e) => (e.id === form.id ? form : e)));
    } else {
      setEmployees([
        ...employees,
        { ...form, id: Date.now(), avatar: avatar1 }
      ]);
    }
    setOpenDialog(false);
  };

  // ---------- UI ----------
  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          Employees ({employees.length})
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Add Employee
        </Button>
      </Stack>

      {/* Employee List */}
      <Stack spacing={2}>
        {employees.map((emp) => (
          <Card key={emp.id} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar src={emp.avatar}>
                {emp.name?.[0]}
              </Avatar>

              <Box flex={1}>
                <Typography fontWeight={600}>{emp.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {emp.email}
                </Typography>
              </Box>

              <Box width={120}>
                <Typography variant="caption">Gender</Typography>
                <Typography>{emp.gender}</Typography>
              </Box>

              <Box width={140}>
                <Typography variant="caption">Birthday</Typography>
                <Typography>{emp.birthday}</Typography>
              </Box>

              <Box width={80}>
                <Typography variant="caption">Age</Typography>
                <Typography>{emp.age}</Typography>
              </Box>

              <Box width={180}>
                <Typography variant="caption">Position</Typography>
                <Typography>
                  {emp.position}
                  <Chip
                    label={emp.level}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>

              <IconButton onClick={(e) => openMenu(e, emp)}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>

      {/* Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem onClick={openEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {form.id ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField label="Gender" value={form.gender || ''} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
            <TextField label="Birthday" value={form.birthday || ''} onChange={(e) => setForm({ ...form, birthday: e.target.value })} />
            <TextField label="Age" value={form.age || ''} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <TextField label="Position" value={form.position || ''} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <TextField label="Level" value={form.level || ''} onChange={(e) => setForm({ ...form, level: e.target.value })} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
