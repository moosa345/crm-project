import { Box, Typography } from '@mui/material';
import logoIcon from 'assets/images/users/Company-logo.png';

// ==============================|| LOGO IMAGE ||============================== //

export default function LogoMain() {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      {/* Logo Image */}
      <Box
        component="img"
        src={logoIcon}
        alt="Company Logo"
        sx={{
          width: 42,
          height: 42,
          objectFit: 'contain'
        }}
      />

      {/* Brand Text */}
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: 1.1,
            color: '#2b6cdc',
            letterSpacing: '0.5px'
          }}
        >
          CRM
        </Typography>

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: 1.2,
            color: '#6b7280',
            letterSpacing: '0.3px'
          }}
        >
          Workroom
        </Typography>
      </Box>
    </Box>
  );
}