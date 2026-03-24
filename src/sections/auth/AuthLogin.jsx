import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// icons
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// assets
import logo from '../../assets/images/users/Company-logo.png';
import image from '../../assets/images/users/Illustration.svg';

const Login = () => {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(email);

    if (storedPassword === password) {
      console.log('Login successful!');
    } else {
      console.log('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default'
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { md: 5, lg: 7 },
          color: '#fff',
          background: 'linear-gradient(135deg, #3f8cff 0%, #2563eb 100%)',
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28
        }}
      >
        {/* Brand */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{
              width: 52,
              height: 52,
              objectFit: 'contain'
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
            Woorkroom
          </Typography>
        </Stack>

        {/* Hero Content */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
              fontSize: { md: '2.2rem', lg: '3rem' }
            }}
          >
            YOUR PLACE TO WORK
            <br />
            PLAN. CREATE. CONTROL.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 500,
              lineHeight: 1.8
            }}
          >
            Manage your projects, tasks, team collaboration, and CRM workflow in one smart workspace.
          </Typography>
        </Box>

        {/* Illustration */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 4
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Illustration"
            sx={{
              width: '100%',
              maxWidth: 430,
              height: 'auto'
            }}
          />
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2.5, sm: 4, md: 6 },
          py: { xs: 4, md: 6 },
          bgcolor: '#f8fafc'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 460,
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          {/* Mobile brand */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ display: { xs: 'flex', md: 'none' }, mb: 3 }}
          >
            <Box
              component="img"
              src={logo}
              alt="Company Logo"
              sx={{
                width: 42,
                height: 42,
                objectFit: 'contain'
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Woorkroom
            </Typography>
          </Stack>

          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Sign In
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back! Please enter your details to continue.
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                spacing={1}
              >
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />

                <Link component={RouterLink} to="/forgot-password" underline="hover" sx={{ fontWeight: 600 }}>
                  Forgot Password?
                </Link>
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: 'none'
                }}
              >
                Log In →
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover" sx={{ fontWeight: 700 }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default authLogin;