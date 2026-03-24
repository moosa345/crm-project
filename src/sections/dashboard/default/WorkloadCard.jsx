import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| WORKLOAD ITEM ||============================== //

function WorkloadItem({ label, value, color }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {value}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={value}
        color={color}
        sx={{
          height: 8,
          borderRadius: 5,
          bgcolor: 'grey.200'
        }}
      />
    </Box>
  );
}

WorkloadItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info'])
};

// ==============================|| WORKLOAD CARD ||============================== //

export default function WorkloadCard() {
  return (
    <MainCard
      content={false}
      sx={{
        borderRadius: 3
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h5" sx={{ mb: 2.5 }}>
          Workload
        </Typography>

        <Stack spacing={2.5}>
          <WorkloadItem label="Sales Team" value={75} color="primary" />
          <WorkloadItem label="Marketing" value={55} color="secondary" />
          <WorkloadItem label="Development" value={90} color="success" />
          <WorkloadItem label="Support" value={65} color="warning" />
        </Stack>
      </Box>
    </MainCard>
  );
}