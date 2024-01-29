import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function LoginComponent({ onClose }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed in:', userCredential.user.uid);
      setErrors([]);
      setEmail("");
      setPassword("");
      localStorage.setItem('user-data', JSON.stringify({
        email: email,
        userId: userCredential.user.uid,
      }));
      onClose(); 
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        setErrors(['Invalid email or password.']);
      } else {
        setErrors([errorMessage]);
      }

      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors(['Please enter your email before resetting the password.']);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setErrors([]);
      console.log('Password reset email sent to:', email);
    } catch (err) {
      const errorMessage = err.message;
      setErrors([errorMessage]);
      console.error(err);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography align="center">
              <Button onClick={handleForgotPassword} color="primary">
                Forgot Password?
              </Button>
            </Typography>
            {errors.map((error, index) => (
              <p style={{"color":"red"}} key={index}>{error}</p>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
