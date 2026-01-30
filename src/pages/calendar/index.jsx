import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add
} from '@mui/icons-material';

/* ------------------ Utils ------------------ */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getDaysInMonth = (date) => {
  const start = dayjs(date).startOf('month');
  const end = dayjs(date).endOf('month');

  const days = [];
  let current = start.startOf('week').add(1, 'day'); // Monday

  while (current.isBefore(end.endOf('week'))) {
    days.push(current);
    current = current.add(1, 'day');
  }
  return days;
};

/* ------------------ Component ------------------ */
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    date: '',
    duration: ''
  });

  /* ---------- CRUD ---------- */
  const handleSave = () => {
    if (editId) {
      setEvents(events.map(e =>
        e.id === editId ? { ...e, ...form } : e
      ));
    } else {
      setEvents([...events, { ...form, id: Date.now() }]);
    }
    setOpen(false);
    setForm({ title: '', date: '', duration: '' });
    setEditId(null);
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditId(event.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  /* ---------- Calendar ---------- */
  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <Box p={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Calendar</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Event
        </Button>
      </Stack>

      {/* Month Navigation */}
      <Stack direction="row" justifyContent="center" alignItems="center" mb={2}>
        <IconButton onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" mx={2}>
          {currentDate.format('MMMM, YYYY')}
        </Typography>
        <IconButton onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>
          <ChevronRight />
        </IconButton>
      </Stack>

      {/* Calendar Grid */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
          {days.map(d => (
            <Typography key={d} fontWeight={600} textAlign="center">
              {d}
            </Typography>
          ))}

          {daysInMonth.map(day => {
            const dayEvents = events.filter(e =>
              dayjs(e.date).isSame(day, 'day')
            );

            return (
              <Box
                key={day.toString()}
                minHeight={120}
                border="1px solid #eee"
                p={1}
              >
                <Typography variant="caption">
                  {day.date()}
                </Typography>

                {dayEvents.map(ev => (
                  <Paper
                    key={ev.id}
                    sx={{
                      mt: 1,
                      p: 1,
                      borderLeft: '4px solid #6c63ff',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(ev)}
                  >
                    <Typography fontSize={12} fontWeight={600}>
                      {ev.title}
                    </Typography>
                    <Typography fontSize={11} color="text.secondary">
                      {ev.duration}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Button size="small" onClick={() => handleEdit(ev)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(ev.id)}>
                        Delete
                      </Button>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editId ? 'Edit Event' : 'Add Event'}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Duration (eg: 3h)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
