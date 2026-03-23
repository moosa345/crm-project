
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ mt: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} CRM System. All rights reserved.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          •
        </Typography>

        
      </Stack>
    </Container>
  );
}
