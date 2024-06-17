import React, { useState } from 'react';
import { Paper, ListItemText, Checkbox, IconButton, Grid, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import styled from '@emotion/styled';
import apiService from '../ApiService';
import { useAuth } from '../context/authContext'; 

const ToDoItemContainer = styled(Paper)`
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 5px;
`;

const ToDoItem = ({ item, refreshItems }) => {
  const { currentUser } = useAuth();
  const [checked, setChecked] = useState(false); 
  const [open, setOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false); 
  const [warningMessage, setWarningMessage] = useState(''); 
  const [deleteItemId, setDeleteItemId] = useState(null);

  const isSampleItem = item.id === 0;

  const toSydneyTime = (date) => {
    return new Date(date.toLocaleString("en-US", { timeZone: "Australia/Sydney" }));
  };

  const displayDate = item.duedate ? toSydneyTime(new Date(item.duedate)).toISOString().split('T')[0] : 'Invalid Date';

  const handleMarkDone = async () => {
    if (!currentUser || isSampleItem) {
      setWarningMessage('You need to log in to perform this action.');
      setShowWarning(true);
      return;
    }

    const updatedItem = { ...item, status: true };

    try {
      await apiService.updateToDoItem(updatedItem, currentUser.uid);
      refreshItems();
    } catch (error) {
      console.error('Error updating to-do item:', error);
    }
  };

  const handleRemoveDone = async () => {
    if (!currentUser || isSampleItem) {
      setWarningMessage('You need to log in to perform this action.');
      setShowWarning(true);
      return;
    }

    const updatedItem = { ...item, status: false };

    try {
      await apiService.updateToDoItem(updatedItem, currentUser.uid);
      refreshItems();
    } catch (error) {
      console.error('Error updating to-do item:', error);
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!checked); // switch checked status
  };

  const handleClickOpen = (id) => {
    setDeleteItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteItemId(null);
  };

  const handleDelete = async (id) => {
    setOpen(false);
    if (!currentUser || isSampleItem) {
      setWarningMessage('You need to log in to perform this action.');
      setShowWarning(true);
      return;
    }

    try {
      await apiService.deleteToDoItem(id);
      refreshItems();
    } catch (error) {
      console.error('Error deleting to-do item:', error);
    }
  };

  return (
    <>
      <ToDoItemContainer elevation={6}>
        <Grid container alignItems="center" width="100%">
          <Grid item xs={7} display="flex" alignItems="center">
            <Checkbox 
              id={`checkbox-${item.id}`}
              checked={checked} 
              onChange={handleCheckboxChange} 
            />
            <ListItemText 
              id={`text-${item.id}`}
              primary={item.text} 
              style={{ textDecoration: item.status ? 'line-through' : 'none' }} 
            />
          </Grid>
          <Grid item xs={1.5}>
            <ListItemText primary={displayDate} style={{ fontSize: '12px', color: 'gray' }} />
          </Grid>
          <Grid item xs={1.5}>
            <ListItemText primary={item.label} style={{ fontSize: '12px', color: 'gray' }} />
          </Grid>
          {checked && (
            <Grid item xs={2} container justifyContent="flex-end">
              {item.status ? (
                <>
                  <Tooltip title="Undo" arrow>
                    <span>
                      <IconButton onClick={handleRemoveDone} disabled={isSampleItem}>
                        <UndoIcon color="primary" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <span>
                      <IconButton onClick={() => handleClickOpen(item.id)} disabled={isSampleItem}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Mark as Done" arrow>
                    <span>
                      <IconButton onClick={handleMarkDone} disabled={isSampleItem}>
                        <DoneIcon color="primary" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <span>
                      <IconButton onClick={() => handleClickOpen(item.id)} disabled={isSampleItem}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}
            </Grid>
          )}
        </Grid>
      </ToDoItemContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => handleDelete(deleteItemId)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
        <DialogTitle>Action Not Allowed</DialogTitle>
        <DialogContent>
          <DialogContentText>{warningMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWarning(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoItem;
