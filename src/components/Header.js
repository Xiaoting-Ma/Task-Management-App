import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styled from '@emotion/styled';
import { useAuth } from '../context/authContext'; 

const StyledAppBar = styled(AppBar)`
  margin: 5px 30px 0px 30px;
  height: 50px;
  border-radius: 50px;
  background: linear-gradient(180deg, rgba(21, 52, 72, 0.8) 0%, rgba(21, 52, 72, 1) 50%, rgba(34, 34, 34, 0.8) 100%);
  width: calc(100% - 60px);
  box-sizing: border-box;
`;

const Header = ({ themeMode, toggleTheme }) => {
  const { currentUser } = useAuth(); // get current logged in user 

  return (
    <StyledAppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DuoTask
        </Typography>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        {currentUser && currentUser.displayName && (
          <Typography variant="subtitle1" style={{ marginRight: '10px' }}>
            {currentUser.displayName}
          </Typography>
        )}
        <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
