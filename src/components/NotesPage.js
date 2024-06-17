import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SingleNote from './SingleNote';
import NoteEditor from './NoteEditor';
import apiService from '../ApiService';
import { useAuth } from '../context/authContext'; 
import { WarningDialog } from './Dialogs'; 

const NotesPage = () => {
  const [notes, setNotes] = useState([
    { id: 'sample-note', title: 'Sample Note', content: 'This is a sample note.', record_time: new Date().toISOString() }
  ]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showWarning, setShowWarning] = useState(false); 
  const [warningMessage, setWarningMessage] = useState(''); 
  const { currentUser } = useAuth(); 

  useEffect(() => {
    if (currentUser) {
      apiService.getNotes(currentUser.uid).then((data) => {
        if (data && data.length > 0) {
          setNotes(data);
        }
      });
    }
  }, [currentUser]);

  const toSydneyTime = (date) => {
    return new Date(date.toLocaleString("en-US", { timeZone: "Australia/Sydney" }));
  };

  const handleAddNote = async () => {
    if (!currentUser) {
      setWarningMessage('You need to log in to add notes.');
      setShowWarning(true);
      return;
    }

    const newNote = {
      userId: currentUser.uid,
      title: 'New Note',
      content: 'This is a new note.',
      record_time: toSydneyTime(new Date()).toISOString(),
    };

    console.log('Sending new note:', newNote);

    try {
      const addedNotes = await apiService.addNote(newNote);
      if (addedNotes && addedNotes.length > 0) {
        const addedNote = addedNotes[0];
        setNotes([...notes, addedNote]);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleSaveNote = async (updatedNote) => {
    const updatedNoteWithTime = {
      ...updatedNote,
      userId: currentUser.uid, 
      record_time: updatedNote.record_time || toSydneyTime(new Date()).toISOString(),
    };

    console.log('Saving note:', updatedNoteWithTime); 

    try {
      await apiService.updateNote(updatedNoteWithTime);
      setNotes(notes.map(note => note.id === updatedNote.id ? updatedNoteWithTime : note));
      setSelectedNote(null);
    } catch (error) {
      console.error('Error updating note:', error); 
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await apiService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedNote(null);
  };

  return (
    <Box style={{ height: 'calc(100vh - 95px)', overflowY: 'auto' }}>
      {selectedNote ? (
        <NoteEditor 
          note={selectedNote} 
          onSave={handleSaveNote} 
          onCancel={handleCancelEdit}
          onDelete={handleDeleteNote}
        />
      ) : (
        <Grid container spacing={2}>
          {notes.length === 0 ? (
            <Typography variant="h6" align="center">No Notes Available</Typography>
          ) : (
            notes.map((note) => (
              note && note.title && ( // 添加检查，确保 note 对象存在并且有 title 属性
                <Grid item key={note.id}>
                  <SingleNote 
                    title={note.title} 
                    content={note.content} 
                    timestamp={note.record_time}  // Ensure to use correct property name from backend
                    onClick={() => setSelectedNote(note)}
                  />
                </Grid>
              )
            ))
          )}
          <Grid item>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <IconButton onClick={handleAddNote}>
                <AddIcon style={{ fontSize: 30, color: 'gray' }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      )}
      <WarningDialog
        open={showWarning}
        onClose={() => setShowWarning(false)}
        warningMessage={warningMessage}
      />
    </Box>
  );
};

export default NotesPage;
