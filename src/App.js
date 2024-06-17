// src/App.js
import React, { useState } from 'react';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ToDoList from './components/ToDoList';
import NotesPage from './components/NotesPage';
import { AuthProvider } from './context/authContext';

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout themeMode={themeMode} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<LandingPage themeMode={themeMode} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/todolist" element={<ToDoList />} />
              <Route path="/notespage" element={<NotesPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
