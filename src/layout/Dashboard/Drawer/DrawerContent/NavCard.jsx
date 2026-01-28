

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import supportImg from 'assets/images/users/support.png';

// ==============================|| DRAWER CONTENT - SUPPORT CARD ||============================== //

export default function SupportCard() {
  return (
    <MainCard
      sx={{
        bgcolor: 'primary.lighter',
        m: 3,
        borderRadius: 4,
        boxShadow: 'none'
      }}
    >
      <Stack alignItems="center" spacing={2.5}>
        {/* Illustration */}
        <CardMedia
          component="img"
          image={supportImg}
          sx={{ width: 120 }}
        />

        {/* Button */}
        <AnimateButton>
          <Button
            variant="contained"
            size="medium"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.2,
              boxShadow: '0 8px 20px rgba(33, 150, 243, 0.35)'
            }}
            startIcon={<i className="material-icons"></i>}
          >
            Support
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
