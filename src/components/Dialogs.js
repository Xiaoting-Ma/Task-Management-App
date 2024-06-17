import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Autocomplete } from '@mui/material';

// Todoolist addItem
export const AddItemDialog = ({ open, onClose, newItem, setNewItem, labels, handleAddItemSubmit }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add New Task</DialogTitle>
    <DialogContent>
      <TextField
        id="new-task-text"
        label="Task"
        fullWidth
        value={newItem.text}
        onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
        margin="normal"
      />
      <TextField
        id="new-task-dueDate"
        label="Due Date"
        type="date"
        fullWidth
        value={newItem.dueDate}
        onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Autocomplete
        id="new-task-label"
        options={labels.filter(label => label !== 'All')}
        value={newItem.label}
        onChange={(event, newValue) => setNewItem({ ...newItem, label: newValue || '' })}
        onInputChange={(event, newInputValue) => setNewItem({ ...newItem, label: newInputValue })}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Label (optional)" margin="normal" fullWidth />}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAddItemSubmit} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);

// todolist and notes delete confirmation
export const ConfirmDeleteDialog = ({ open, onClose, handleConfirmDelete }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
  
// todolist and notes delete warning
export const WarningDialog = ({ open, onClose, warningMessage }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Action Not Allowed</DialogTitle>
    <DialogContent>
      <DialogContentText>{warningMessage}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
