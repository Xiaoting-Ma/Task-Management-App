import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const CenteredPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 130px auto;
  max-width: 400px;
`;

const ButtonStyle = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgba(60, 91, 111, 0.9);
  color: white;
  &:hover {
    background-color: rgba(60, 91, 111, 0.5);
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResetPasswordMode, setIsResetPasswordMode] = useState(false);
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before attempting login
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Failed to log in:', error);
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email address or Incorrect password.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Failed to log in.');
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      await resetPassword(email);
      setResetEmailSent(true);
      setError('');
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      setError('Failed to send password reset email.');
    }
  };

  const handleBackClick = () => {
    if (isResetPasswordMode) {
      setIsResetPasswordMode(false); // Switch to the login mode
    } else {
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <CenteredPaper elevation={6}>
      <Typography variant="h4" gutterBottom>
        {isResetPasswordMode ? 'Reset Password' : 'Login'}
      </Typography>
      <form onSubmit={isResetPasswordMode ? handleResetPassword : handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Box>
        {!isResetPasswordMode && (
          <Box mb={1}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Box>
        )}
        {!isResetPasswordMode && (
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              variant="text"
              color="error"
              onClick={() => setIsResetPasswordMode(true)}
              style={{ fontSize: '0.8rem' }}
            >
              Forgot Password?
            </Button>
          </Box>
        )}
        {error && (
          <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        {resetEmailSent && (
          <Typography variant="body2" color="primary" style={{ marginBottom: '10px' }}>
            Password reset email sent!
          </Typography>
        )}
        <Box display="flex" justifyContent="center" gap="15%" mt={1}>
          <ButtonStyle
            type="button"
            onClick={handleBackClick}
          >
            Back
          </ButtonStyle>
          <ButtonStyle type="submit" variant="contained" color="primary">
            {isResetPasswordMode ? 'Send Email' : 'Login'}
          </ButtonStyle>
        </Box>
      </form>
    </CenteredPaper>
  );
};

export default Login;
