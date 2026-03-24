import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

// project import
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import SupportRequestModal from 'components/SupportRequestModal';

// assets
import supportImg from 'assets/images/users/support.png';

// ==============================|| DRAWER CONTENT - SUPPORT CARD ||============================== //

export default function NavCard() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
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
              onClick={handleOpen}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.2,
                boxShadow: '0 8px 20px rgba(33, 150, 243, 0.35)',
                textTransform: 'none',
                fontWeight: 700
              }}
            >
              Support
            </Button>
          </AnimateButton>
        </Stack>
      </MainCard>

      {/* Popup Modal */}
      <SupportRequestModal open={openModal} handleClose={handleClose} />
    </>
  );
}