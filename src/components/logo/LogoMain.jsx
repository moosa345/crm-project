import { Box, Typography } from '@mui/material';
import logoIcon from 'assets/images/users/Company-logo.png';

// ==============================|| LOGO IMAGE ||============================== //

export default function LogoMain() {
  return (
    <Box display="flex" alignItems="center">
      <Box
        component="img"
        src={logoIcon}
        alt="Company Logo"
        sx={{
          width: 40,
          height: 40,
          objectFit: 'contain'
        }}
      />

      <Typography
        sx={{
          ml: '15px',
          fontWeight: 'bold',
          fontSize: '35px',
          color: '#2b6cdc'
        }}
      >
        CRM
      </Typography>
    </Box>
  );
}