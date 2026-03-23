import { useEffect, useState } from "react";
import { useEmployeeStore } from "store/useEmployeeStore";

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
} from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Employees() {
  const {
    employees,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeStore();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ---------- AGE CALCULATOR ----------
  const getAge = (birthday) => {
    if (!birthday) return "";
    const birth = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

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

  const handleDelete = async () => {
    await deleteEmployee(selected._id);
    closeMenu();
  };

  const handleSave = async () => {
    if (form._id) {
      await updateEmployee(form._id, form);
    } else {
      await addEmployee(form);
    }
    setOpenDialog(false);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          Employees ({employees.length})
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          Add Employee
        </Button>
      </Stack>

      {/* Employee List */}
      <Stack spacing={2}>
        {employees.map((emp) => (
          <Card key={emp._id} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              
              <Avatar>{emp.name?.[0]}</Avatar>

              {/* Name + Email */}
              <Box flex={1}>
                <Typography fontWeight={600}>{emp.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {emp.mail}
                </Typography>
              </Box>

              {/* Gender */}
              <Box width={120}>
                <Typography variant="caption">Gender</Typography>
                <Typography>{emp.gender}</Typography>
              </Box>

              {/* Birthday */}
              <Box width={150}>
                <Typography variant="caption">DOB</Typography>
                <Typography>
                  {emp.birthday
                    ? new Date(emp.birthday).toLocaleDateString()
                    : ""}
                </Typography>
              </Box>

              {/* Age */}
              <Box width={80}>
                <Typography variant="caption">Age</Typography>
                <Typography>{getAge(emp.birthday)}</Typography>
              </Box>

              {/* Position */}
              <Box width={200}>
                <Typography variant="caption">Position</Typography>
                <Typography>
                  {emp.position}
                  <Chip label={emp.level} size="small" sx={{ ml: 1 }} />
                </Typography>
              </Box>

              {/* Menu */}
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
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{form._id ? "Edit Employee" : "Add Employee"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>

            <TextField
              label="Name"
              value={form.name || ""}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <TextField
              label="Mail"
              value={form.mail || ""}
              onChange={(e) =>
                setForm({ ...form, mail: e.target.value })
              }
            />

            <TextField
              label="Gender"
              value={form.gender || ""}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            />

            <TextField
              type="date"
              label="Birthday"
              InputLabelProps={{ shrink: true }}
              value={form.birthday || ""}
              onChange={(e) =>
                setForm({ ...form, birthday: e.target.value })
              }
            />

            <TextField
              label="Position"
              value={form.position || ""}
              onChange={(e) =>
                setForm({ ...form, position: e.target.value })
              }
            />

            <TextField
              label="Level"
              value={form.level || ""}
              onChange={(e) =>
                setForm({ ...form, level: e.target.value })
              }
            />

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