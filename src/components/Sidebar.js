import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteIcon from '@mui/icons-material/Note';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledList = styled(List)`
  background: linear-gradient(180deg, rgba(21, 52, 72, 0.95) 0%, rgba(60, 91, 111, 0.7) 60%, rgba(60, 91, 111, 1) 100%);
  color: white;  /* text color */
  border-radius: 10px;
  padding: 10px 5px;
  height: 100%;
  margin-left: 30px;
  @media (min-width: 600px) {
    flex-direction: row; /* Change to row on larger screens */
  }

  @media (max-width: 1000px) {
    margin-left: 10px; /* Reduce margin on small screens */
    padding: 5px 2px; /* Reduce padding on small screens */
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: white;  /* Icon color */
`;

const StyledListItem = styled(ListItem)`
  border-radius: 10px; /* Elliptical shape */
  margin: 5px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.Mui-selected {
    background-color: rgba(255, 255, 255, 0.2);
  }

`;

const StyledListItemText = styled(ListItemText)`
  @media (max-width: 800px) {
    display: none; /* Hide text on small screens */
  }
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <StyledList>
      <StyledListItem
        button
        component={Link}
        to="/"
        selected={location.pathname === '/'}
      >
        <StyledListItemIcon>
          <HomeIcon />
        </StyledListItemIcon>
        <StyledListItemText primary="Home" />
      </StyledListItem>
      <StyledListItem
        button
        component={Link}
        to="/todolist"
        selected={location.pathname === '/todolist'}
      >
        <StyledListItemIcon>
          <AssignmentIcon />
        </StyledListItemIcon>
        <StyledListItemText primary="To-Do List" />
      </StyledListItem>
      <StyledListItem
        button
        component={Link}
        to="/notespage"
        selected={location.pathname === '/notespage'}
      >
        <StyledListItemIcon>
          <NoteIcon />
        </StyledListItemIcon>
        <StyledListItemText primary="Notes" />
      </StyledListItem>
    </StyledList>
  );
};

export default Sidebar;
