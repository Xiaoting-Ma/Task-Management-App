// src/apiService.js
import { supabase } from './supabaseClient';

const apiService = {
  addUser: async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ userid: user.uid, username: user.username, email: user.email }]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  getToDoItems: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('todolist')
        .select('*')
        .eq('userid', userId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching to-do items:', error);
      throw error;
    }
  },
  addToDoItem: async (item) => {
    try {
      const { data, error } = await supabase
        .from('todolist')
        .insert([{
          userid: item.userId,
          text: item.text,
          duedate: item.dueDate,
          label: item.label,
          status: item.status
        }])
        .select(); 
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to-do item:', error);
      throw error;
    }
  },
  updateToDoItem: async (item) => {
    try {
      const { data, error } = await supabase
        .from('todolist')
        .update({
          text: item.text,
          duedate: item.dueDate,
          label: item.label,
          status: item.status
        })
        .eq('id', item.id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating to-do item:', error);
      throw error;
    }
  },
  deleteToDoItem: async (id) => {
    try {
      const { error } = await supabase
        .from('todolist')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting to-do item:', error);
      throw error;
    }
  },
  getNotes: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('userid', userId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },
  addNote: async (note) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{
          userid: note.userId,
          title: note.title,
          content: note.content,
          record_time: note.record_time
        }])
        .select(); // 确保选择插入的项目
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },
  updateNote: async (note) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .update({
          title: note.title,
          content: note.content,
          record_time: note.record_time
        })
        .eq('id', note.id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },
  deleteNote: async (id) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

export default apiService;



// import axios from 'axios';

// const API_URL = 'http://localhost:3080/api';


// const apiService = {
//   addUser: async (user) => {
//     try {
//       const response = await axios.post(`${API_URL}/signup`, user);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding user:', error);
//       throw error;
//     }
//   },
//   getToDoItems: async (userId) => {
//     try {
//       const response = await axios.get(`${API_URL}/todolist`, { params: { userId } });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching to-do items:', error);
//       throw error;
//     }
//   },
//   addToDoItem: async (item) => {
//     try {
//       const response = await axios.post(`${API_URL}/todolist`, item);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding to-do item:', error);
//       throw error;
//     }
//   },
//   updateToDoItem: async (item, userId) => {
//     try {
//       const updatedItem = { ...item, userId };
//       const response = await axios.put(`${API_URL}/todolist/${item.id}`, updatedItem);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating to-do item:', error);
//       throw error;
//     }
//   },
//   deleteToDoItem: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/todolist/${id}`);
//     } catch (error) {
//       console.error('Error deleting to-do item:', error);
//       throw error;
//     }
//   },
//   getNotes: async (userId) => {
//     try {
//       const response = await axios.get(`${API_URL}/notespage`, { params: { userId } });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//       throw error;
//     }
//   },
//   addNote: async (note) => {
//     try {
//       const response = await axios.post(`${API_URL}/notespage`, note);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding note:', error);
//       throw error;
//     }
//   },
//   updateNote: async (note) => {
//     try {
//       const response = await axios.put(`${API_URL}/notespage/${note.id}`, note);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating note:', error);
//       throw error;
//     }
//   },
//   deleteNote: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/notespage/${id}`);
//     } catch (error) {
//       console.error('Error deleting note:', error);
//       throw error;
//     }
//   },
// };

// export default apiService;
