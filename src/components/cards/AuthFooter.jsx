// material-ui
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';


// // ==============================|| FOOTER - AUTHENTICATION ||============================== //

// export default function AuthFooter() {
//   return (
//     <Container maxWidth="xl">
//       <Stack
//         direction={{ xs: 'column', sm: 'row' }}
//         sx={{ gap: 2, justifyContent: { xs: 'center', sm: 'space-between', textAlign: { xs: 'center', sm: 'inherit' } } }}
//       >
//         <Typography variant="subtitle2" color="secondary">
//           © Made with love by Team{' '}
//           <Link href="https://codedthemes.com/" target="_blank" underline="hover">
//             CodedThemes
//           </Link>
//         </Typography>

//         <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1, sm: 3 }, textAlign: { xs: 'center', sm: 'inherit' } }}>
//           <Typography
//             variant="subtitle2"
//             color="secondary"
//             component={Link}
//             href="https://mui.com/store/terms/"
//             target="_blank"
//             underline="hover"
//           >
//             Terms and Conditions
//           </Typography>
//           <Typography
//             variant="subtitle2"
//             color="secondary"
//             component={Link}
//             href="https://mui.com/legal/privacy/"
//             target="_blank"
//             underline="hover"
//           >
//             Privacy Policy
//           </Typography>
//         </Stack>
//       </Stack>
//     </Container>
//   );
// }


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

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
          © {new Date().getFullYear()} Unique Services
        </Typography>

        <Typography variant="body2" color="text.secondary">
          •
        </Typography>

        <Link href="#" underline="hover" variant="body2">
          Privacy Policy
        </Link>
      </Stack>
    </Container>
  );
}
