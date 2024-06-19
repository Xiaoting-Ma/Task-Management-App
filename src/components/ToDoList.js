import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, List, IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import ToDoItem from './ToDoItem';
import LabelList from './LabelList';
import apiService from '../ApiService'; 
import { useAuth } from '../context/authContext'; 
import { AddItemDialog, WarningDialog } from './Dialogs'; 

const ToDoContainer = styled(Box)`
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 10px;
  margin: 10px;
  @media (max-width: 600px) {
    margin: 10px 2px;
    padding: 10px 2px;
  }
`;

const ToDoList = () => {
  const { currentUser } = useAuth(); 
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [labels, setLabels] = useState(['All']);
  const [toDoItems, setToDoItems] = useState([]);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ text: '', dueDate: '', label: '' });
  const [showWarning, setShowWarning] = useState(false); 
  const [warningMessage, setWarningMessage] = useState(''); 

  const sampleItem = useMemo(() => ({
    id: 0,
    text: 'Sample Task',
    dueDate: new Date().toISOString().split('T')[0],
    label: 'Sample',
    status: false
  }), []);

  const loadItems = useCallback(async (userId) => {
    try {
      const data = await apiService.getToDoItems(userId);
      const sortedItems = data.sort((a, b) => a.status - b.status); // sort according to the status
      setToDoItems(sortedItems.length > 0 ? sortedItems : [sampleItem]); // if no data, show sampleItem
      const labelsFromItems = [...new Set(data.map(item => item.label))];
      setLabels(['All', ...labelsFromItems]);
    } catch (error) {
      console.error('Error fetching todo list:', error);
      setToDoItems([sampleItem]); // if error, show sampleItem
    }
  }, [sampleItem]);

  useEffect(() => {
    if (currentUser) {
      loadItems(currentUser.uid);
    } else {
      setToDoItems([sampleItem]);
    }
  }, [currentUser, loadItems, sampleItem]);

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

  const handleAddItem = () => {
    setNewItemDialogOpen(true);
  };

  const handleAddItemClose = () => {
    setNewItemDialogOpen(false);
    setNewItem({ text: '', dueDate: '', label: '' });
  };

  const handleAddItemSubmit = async () => {
    if (!currentUser) {
      setWarningMessage('You need to log in to add items.');
      setShowWarning(true);
      return;
    }

    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 3);
    const newDueDate = newItem.dueDate || defaultDueDate.toISOString().split('T')[0];

    const newItemWithDefaults = { ...newItem, dueDate: newDueDate, status: false, userId: currentUser.uid };

    try {
      const addedItems = await apiService.addToDoItem(newItemWithDefaults);
      
      if (!addedItems || addedItems.length === 0) {
        throw new Error('Failed to add to-do item.');
      }
      
      const addedItem = addedItems[0];
      setToDoItems([...toDoItems, { ...addedItem, dueDate: newDueDate }]);
      setNewItem({ text: '', dueDate: '', label: '' });
      setNewItemDialogOpen(false);
      if (newItem.label && !labels.includes(newItem.label)) {
        setLabels([...labels, newItem.label]);
      }
    } catch (error) {
      console.error('Error adding to-do item:', error);
    }
  };

  const refreshItems = useCallback(() => {
    if (currentUser) {
      loadItems(currentUser.uid);
    } else {
      setToDoItems([sampleItem]);
    }
  }, [currentUser, loadItems, sampleItem]);

  const filteredItems = selectedLabel === 'All' ? toDoItems : toDoItems.filter(item => item.label === selectedLabel);
  const sortedItems = [...filteredItems].sort((a, b) => a.status - b.status);

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <LabelList labels={labels} selectedLabel={selectedLabel} handleLabelClick={handleLabelClick} toDoItems={toDoItems} />
      </Grid>
      <Grid item xs={10}>
        <ToDoContainer>
          <Typography variant="h6" gutterBottom>{selectedLabel}</Typography>
          <List>
            {sortedItems.map((item) => (
              <ToDoItem
                key={item.id}
                item={item}
                setShowWarning={setShowWarning}
                setWarningMessage={setWarningMessage}
                refreshItems={refreshItems}
              />
            ))}
          </List>
          <Box display="flex" justifyContent="center" marginTop="20px">
            <IconButton onClick={handleAddItem}>
              <AddIcon style={{ fontSize: 30, color: 'gray' }} />
            </IconButton>
          </Box>
        </ToDoContainer>
      </Grid>
      <AddItemDialog
        open={newItemDialogOpen}
        onClose={handleAddItemClose}
        newItem={newItem}
        setNewItem={setNewItem}
        labels={labels}
        handleAddItemSubmit={handleAddItemSubmit}
      />
      <WarningDialog
        open={showWarning}
        onClose={() => setShowWarning(false)}
        warningMessage={warningMessage}
      />
    </Grid>
  );
};

export default ToDoList;
