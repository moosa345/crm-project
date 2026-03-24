import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// icons
import CloseIcon from '@mui/icons-material/Close';

// project import
import MainCard from 'components/MainCard';

// assets
import supportImg from 'assets/images/users/support.png';

// ==============================|| SUPPORT REQUEST MODAL ||============================== //

export default function SupportRequestModal({ open, handleClose }) {
  const [subject, setSubject] = useState('Technical difficulties');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Please enter description');
      return;
    }

    const formData = {
      subject,
      description
    };

    console.log('Support Request Submitted:', formData);

    alert('Support request submitted successfully!');

    setSubject('Technical difficulties');
    setDescription('');
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="support-request-modal"
      sx={{
        bgcolor: 'rgba(17, 24, 39, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <MainCard
        content={false}
        sx={{
          width: { xs: '95%', sm: 560, md: 620 },
          maxWidth: 620,
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 5,
          border: 'none',
          boxShadow: '0 24px 60px rgba(17, 24, 39, 0.18)',
          outline: 'none',
          bgcolor: '#ffffff',
          position: 'relative'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 2.5, sm: 4 }
          }}
        >
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#111827',
                fontSize: { xs: '1.4rem', sm: '1.8rem' }
              }}
            >
              Need some Help?
            </Typography>

            <IconButton
              onClick={handleClose}
              sx={{
                width: 42,
                height: 42,
                bgcolor: '#f3f6fb',
                borderRadius: '50%',
                flexShrink: 0,
                '&:hover': {
                  bgcolor: '#e8eef8'
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 22, color: '#111827' }} />
            </IconButton>
          </Stack>

          {/* Image Box */}
          <Box
            sx={{
              bgcolor: '#eef4ff',
              borderRadius: 4,
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 2.5 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3,
              minHeight: { xs: 140, sm: 180 }
            }}
          >
            <Box
              component="img"
              src={supportImg}
              alt="Support"
              sx={{
                width: '100%',
                maxWidth: { xs: 240, sm: 320 },
                maxHeight: { xs: 140, sm: 180 },
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Text */}
          <Typography
            variant="body1"
            sx={{
              color: '#6b7280',
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            Describe your question and our specialists will answer you within 24 hours.
          </Typography>

          {/* Subject */}
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: '#6b7280',
              fontWeight: 600
            }}
          >
            Request Subject
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{
                borderRadius: 3,
                height: 52,
                bgcolor: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#dbe4f0'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b9c7db'
                }
              }}
            >
              <MenuItem value="Technical difficulties">Technical difficulties</MenuItem>
              <MenuItem value="Billing issue">Billing issue</MenuItem>
              <MenuItem value="Account issue">Account issue</MenuItem>
              <MenuItem value="Feature request">Feature request</MenuItem>
            </Select>
          </FormControl>

          {/* Description */}
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: '#6b7280',
              fontWeight: 600
            }}
          >
            Description
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add some description of the request"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '& fieldset': {
                  borderColor: '#dbe4f0'
                },
                '&:hover fieldset': {
                  borderColor: '#b9c7db'
                }
              }
            }}
          />

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.2,
                minWidth: 150,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 8px 20px rgba(33, 150, 243, 0.35)'
              }}
            >
              Send Request
            </Button>
          </Box>
        </Box>
      </MainCard>
    </Modal>
  );
}

SupportRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};