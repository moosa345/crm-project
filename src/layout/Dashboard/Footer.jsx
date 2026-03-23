// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; All rights reserved CRM system{' '}
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="https://" target="_blank" variant="caption" color="text.primary">
          privacy policy
        </Link>
        <Link href="https://" target="_blank" variant="caption" color="text.primary">
          terms of service
        </Link>
        <Link href="https://wa.me/7899508016" target="_blank" variant="caption" color="text.primary">
          contact us
        </Link>
      </Stack>
    </Stack>
  );
}
