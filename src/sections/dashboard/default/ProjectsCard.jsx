import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  AvatarGroup,
  Link,
  Divider
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MainCard from 'components/MainCard';

// Demo avatar images
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

const projects = [
  {
    id: 1,
    code: 'PN0001265',
    title: 'Medical App (iOS native)',
    date: 'Created Sep 12, 2020',
    priority: 'Medium',
    priorityType: 'up',
    priorityColor: '#F59E0B',
    emoji: '💊',
    allTasks: 34,
    activeTasks: 13,
    assignees: [avatar1, avatar2],
    extra: 2
  },
  {
    id: 2,
    code: 'PN0001221',
    title: 'Food Delivery Service',
    date: 'Created Sep 10, 2020',
    priority: 'Medium',
    priorityType: 'up',
    priorityColor: '#F59E0B',
    emoji: '🍔',
    allTasks: 50,
    activeTasks: 24,
    assignees: [avatar2, avatar3, avatar4],
    extra: 0
  },
  {
    id: 3,
    code: 'PN0001290',
    title: 'Food Delivery Service',
    date: 'Created May 28, 2020',
    priority: 'Low',
    priorityType: 'down',
    priorityColor: '#22C55E',
    emoji: '📱',
    allTasks: 23,
    activeTasks: 20,
    assignees: [avatar1, avatar3, avatar4],
    extra: 5
  }
];

const PriorityIndicator = ({ type, label, color }) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {type === 'up' ? (
        <ArrowUpwardIcon sx={{ fontSize: 16, color }} />
      ) : (
        <ArrowDownwardIcon sx={{ fontSize: 16, color }} />
      )}

      <Typography
        variant="caption"
        sx={{
          color,
          fontWeight: 600,
          fontSize: '12px'
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

const ProjectRow = ({ project }) => {
  return (
    <MainCard
      content={false}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0px 4px 18px rgba(0,0,0,0.05)'
      }}
    >
      <Grid container>
        {/* Left Side */}
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Project Emoji Box */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  bgcolor: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}
              >
                {project.emoji || '📦'}
              </Box>

              {/* Project Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 0.3 }}
                >
                  {project.code}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {project.title}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 1.4 }}
                >
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <CalendarTodayOutlinedIcon
                      sx={{ fontSize: 15, color: 'text.secondary' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {project.date}
                    </Typography>
                  </Stack>

                  <PriorityIndicator
                    type={project.priorityType}
                    label={project.priority}
                    color={project.priorityColor}
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Divider */}
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'block' }
          }}
        >
          <Divider orientation="vertical" flexItem />
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md>
          <Box sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.8 }}>
              Project Data
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  All tasks
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                  {project.allTasks}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Active tasks
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                  {project.activeTasks}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Assignees
                </Typography>

                <Box sx={{ mt: 0.7 }}>
                  <AvatarGroup
                    max={4}
                    sx={{
                      justifyContent: 'flex-start',
                      '& .MuiAvatar-root': {
                        width: 26,
                        height: 26,
                        fontSize: '11px',
                        border: '2px solid #fff'
                      }
                    }}
                  >
                    {project.assignees.map((avatar, index) => (
                      <Avatar key={index} src={avatar} />
                    ))}

                    {project.extra > 0 && (
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        +{project.extra}
                      </Avatar>
                    )}
                  </AvatarGroup>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

const ProjectsCard = () => {
  return (
    <Box>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Projects
        </Typography>

        <Link
          href="#"
          underline="none"
          sx={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'primary.main',
            cursor: 'pointer'
          }}
        >
          View all
        </Link>
      </Stack>

      {/* Project List */}
      <Stack spacing={2}>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectsCard;