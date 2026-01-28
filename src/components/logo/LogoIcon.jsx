import { Box } from '@mui/material';

import logoIcon from 'assets/images/users/company-logo.png';


export default function LogoIcon() {
  return (
    <Box
      component="img"
      src={logoIcon}
      alt="Company Logo"
      sx={{
        width: 40,       // icon size
        height: 40,
        objectFit: 'contain'
      }}
    />
  );
}
