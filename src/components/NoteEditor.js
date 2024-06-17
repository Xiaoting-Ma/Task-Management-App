import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import styled from '@emotion/styled';
import apiService from '../ApiService';
import { ConfirmDeleteDialog, WarningDialog } from './Dialogs'; 
import { useAuth } from '../context/authContext'; // useAuth hook

const NoteEditorContainer = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
`;

const NoteEditor = ({ note, onSave, onCancel, onDelete }) => {
  const { currentUser } = useAuth(); 
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [open, setOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false); 
  const [warningMessage, setWarningMessage] = useState(''); 

  const isSampleNote = note.id === 'sample-note';

  const handleSave = () => {
    if (isSampleNote) {
      return; // if sample note，no action
    }
    if (!currentUser) {
      setWarningMessage('You need to log in to save this note.');
      setShowWarning(true);
      return;
    }
    const updatedNote = { ...note, title, content, record_time: note.record_time };
    onSave(updatedNote);
  };

  const handleDelete = () => {
    if (isSampleNote) {
      return; // if sample note，no action
    }
    if (!currentUser) {
      setWarningMessage('You need to log in to delete this note.');
      setShowWarning(true);
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (isSampleNote) {
      return; // if sample note，no action
    }
    await apiService.deleteNote(note.id); // Call the API service to delete the note
    onDelete(note.id); // Call the onDelete prop to update the state
    handleClose();
  };

  return (
    <NoteEditorContainer>
      <TextField
        id="note-title"
        name="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSampleNote}
      />
      <TextField
        id="note-content"
        name="content"
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={18}
        style={{ marginTop: '10px' }}
        disabled={isSampleNote}
      />
      <Box display="flex" justifyContent="center" gap="10%" marginTop="15px">
        <Button onClick={onCancel} variant="outlined" color="primary">
          Back
        </Button>
        <Button onClick={handleDelete} variant="outlined" color="error" disabled={isSampleNote}>
          Delete
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={isSampleNote}>
          Save
        </Button>
      </Box>
      <ConfirmDeleteDialog
        open={open}
        onClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
      />
      <WarningDialog
        open={showWarning}
        onClose={() => setShowWarning(false)}
        warningMessage={warningMessage}
      />
    </NoteEditorContainer>
  );
};

export default NoteEditor;
