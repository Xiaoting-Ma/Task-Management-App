import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 95px);
  color: ${({ themeMode }) => (themeMode === 'light' ? 'black' : 'white')};
  text-align: center;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Slogan = styled.h1`
  font-size: 2em;
  margin-left: 20px; 
`;

const HighlightName = styled.span`
  color: #948979;
  ${'' /* color: #E15C64; */}
  font-weight: bold;
`;

const HiText = styled.span`
  font-weight: bold;
`;

const Introduction = styled.p`
  font-size: 1.2em;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
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

const LandingPage = ({ themeMode }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <LandingContainer themeMode={themeMode}>
      <HeaderContainer>
        {currentUser && (
          <Typography variant="h4">
            <HiText>Hi </HiText>
            <HighlightName themeMode={themeMode}>{currentUser.displayName}</HighlightName>,
          </Typography>
        )}
        <Slogan>Welcome to DuoTask</Slogan>
      </HeaderContainer>
      <Introduction>
        DuoTask is your go-to app for efficient task and note management. Easily create, edit, and manage 
        your to-dos and notes. 
      </Introduction>
      <Introduction>
      Stay organized and boost your productivity. Join us today!
      </Introduction>
      <ButtonContainer>
        {currentUser ? (
          <Button themeMode={themeMode} onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button themeMode={themeMode} onClick={handleSignup}>Sign Up</Button>
            <Button themeMode={themeMode} onClick={handleLogin}>Login</Button>
          </>
        )}
      </ButtonContainer>
    </LandingContainer>
  );
};

export default LandingPage;
