import React from 'react';
import { Paper, ListItem, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledLabelList = styled(Paper)`
  height: calc(100vh - 95px);
  overflow-y: auto;
  border-radius: 10px;
  padding: 10px 5px;
`;

const StyledListItemText = styled(ListItemText)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledListItem = styled(ListItem)`
  border-radius: 10px; /* Elliptical shape */
  width: 100%;
  height: 40px;
  margin: 5px 0px;
  &:hover {
    background-color: #DFD0B8;
  }
  &.Mui-selected {
    background-color: #948979;
  }
`;

const LabelList = ({ labels, selectedLabel, handleLabelClick, toDoItems }) => {
  const getLabelCount = (label) => {
    if (label === 'All') {
      return toDoItems.length;
    }
    return toDoItems.filter(item => item.label === label).length;
  };

  return (
    <StyledLabelList elevation={6}>
      {labels.map((label) => (
        <StyledListItem 
          button 
          key={label} 
          selected={selectedLabel === label} 
          onClick={() => handleLabelClick(label)} 
          id={`list-item-${label}`}  
        >
          <StyledListItemText
            primary={label}
            secondary={
              <Typography>
                {getLabelCount(label)}
              </Typography>
            }
            style={{ paddingLeft: label === 'All' ? '0' : '10px' }} // Indent labels under "All"
            id={`list-item-text-${label}`}  
          />
        </StyledListItem>
      ))}
    </StyledLabelList>
  );
};

export default LabelList;
