
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import your logo image
import logo from 'assets/images/users/company-logo.png';

// ==============================|| LOGO IMAGE ||============================== //

export default function LogoMain() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        src={logo}
        alt="Company Logo"
        style={{
          height: 36,          // adjust size here
          width: 'auto',
          display: 'block'
        }}
      />
    </Box>
  );
}
