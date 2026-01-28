import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { Link } from "react-router-dom";
import logo from '../../assets/images/users/company-Logo.png';
import image from '../../assets/images/users/illustration.svg';
import './Login.css';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/AuthLogin';

const Login = () => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="main">
      <div className="screen1">
        <div className="just">
          <img src={logo} alt="Logo" />
          <h3 className="space">Woorkroom</h3>
        </div>
        <div className="simple">
          {/* <img src={logo} alt="Logo" /> */}
          {/* <img src={ficon} alt="logo" /> */}

          <h2>
            <p>
              YOUR PLACE TO WORK <br />
              PLAN. CREATE. CONTROL.
            </p>
          </h2>
        </div>
        <div className="image">
          <img src={image} alt="Logo" />
        </div>
      </div>

      <div className="screen2">
        <div className="signin-box">
          <h2>Sign In to Woorkroom</h2>

          <label>Email Address</label>
          <input type="email" placeholder="youremail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="eye-icon" onClick={togglePasswordVisibility}>
              
            </button>
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Log In →
          </button>

          <p className="signup">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;