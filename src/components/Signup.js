import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../ApiService';
import { Paper, TextField, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const CenteredPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 70px auto;
  max-width: 400px;
`;

const StyledButton = styled.button`
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

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Name, Email, Password, and Confirm Password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await register(email, password, username);
      const user = userCredential.user;

      await apiService.addUser({ uid: user.uid, username, email: user.email });

      setSuccess('Registration successful!');
      navigate('/'); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to sign up: ' + error.message);
      }
    }
  };

  return (
    <CenteredPaper elevation={6}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <TextField
            label="Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
        </Box>
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
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />
        </Box>
        {error && (
          <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success" style={{ marginBottom: '10px' }}>
            {success}
          </Typography>
        )}
        <Box display="flex" justifyContent="center" gap="15%" mt={2}>
          <StyledButton
            type="button"
            onClick={() => navigate('/')}
          >
            Back
          </StyledButton>
          <StyledButton type="submit">
            Sign Up
          </StyledButton>
        </Box>
      </form>
    </CenteredPaper>
  );
};

export default Signup;
