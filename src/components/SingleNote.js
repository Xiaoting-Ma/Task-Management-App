import React from 'react';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';

const NoteCard = styled(Paper)`
  width: 195px;
  height: 270px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  word-wrap: break-word; /* make sure long word change line */
`;

const SingleNote = ({ title, content, timestamp, onClick }) => {
  const date = new Date(timestamp);
  const displayDate = isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();

  return (
    <NoteCard onClick={onClick} elevation={6}>
      <Typography variant="h6" gutterBottom>{title || 'Untitled Note'}</Typography>
      <Typography variant="body2" style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {content || 'No content available.'}
      </Typography>
      <Typography variant="caption">{displayDate}</Typography>
    </NoteCard>
  );
};

export default SingleNote;
