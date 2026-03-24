import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Link
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const events = [
  {
    id: 1,
    title: 'Presentation of the new department',
    time: 'Today 15:00 PM',
    duration: '4h',
    lineColor: '#3B82F6',
    direction: 'up',
    arrowColor: '#F59E0B'
  },
  {
    id: 2,
    title: "Anna's Birthday",
    time: 'Today 16:00 PM',
    duration: '4h',
    lineColor: '#D946EF',
    direction: 'down',
    arrowColor: '#22C55E'
  },
  {
    id: 3,
    title: "Ray's Birthday",
    time: 'Today 17:00 PM',
    duration: '4h',
    lineColor: '#D946EF',
    direction: 'down',
    arrowColor: '#22C55E'
  }
];

const NearestEventsCard = () => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
        minWidth: 300,
        maxWidth: 340
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight={700}>
            Nearest Events
          </Typography>

          <Link
            href="#"
            underline="none"
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'primary.main',
              cursor: 'pointer'
            }}
          >
            View all
          </Link>
        </Stack>

        {/* Event List */}
        <Stack spacing={2}>
          {events.map((event) => (
            <Box key={event.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              {/* Left colored line */}
              <Box
                sx={{
                  width: '3px',
                  minHeight: 58,
                  borderRadius: 999,
                  bgcolor: event.lineColor,
                  mt: 0.5
                }}
              />

              {/* Main content */}
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        color: 'text.primary',
                        lineHeight: 1.4
                      }}
                    >
                      {event.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                        mt: 0.75
                      }}
                    >
                      {event.time}
                    </Typography>
                  </Box>

                  {/* Right section */}
                  <Stack alignItems="flex-end" spacing={1}>
                    {event.direction === 'up' ? (
                      <ArrowUpwardIcon sx={{ fontSize: 18, color: event.arrowColor }} />
                    ) : (
                      <ArrowDownwardIcon sx={{ fontSize: 18, color: event.arrowColor }} />
                    )}

                    <Chip
                      icon={<AccessTimeIcon sx={{ fontSize: '14px !important' }} />}
                      label={event.duration}
                      size="small"
                      sx={{
                        height: 26,
                        borderRadius: 2,
                        bgcolor: '#F3F4F6',
                        color: '#6B7280',
                        fontSize: '11px',
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: '#6B7280',
                          ml: 0.5
                        },
                        '& .MuiChip-label': {
                          px: 1
                        }
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NearestEventsCard;