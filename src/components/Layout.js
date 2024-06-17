import React from 'react';
import { Grid, Paper } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const MainContent = styled(({ themeMode, ...other }) => <Paper {...other} />)`
  padding: 10px;
  background-color: ${({ themeMode }) => (themeMode === 'light' ? '#f4f4f4' : '#444444')}; // 白天浅灰色，晚上深灰色
  border-radius: 10px;
  height: calc(100vh - 75px);
  overflow-y: auto;
  margin-right: 30px;
`;

const Layout = ({ themeMode, toggleTheme, children }) => (
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <Header themeMode={themeMode} toggleTheme={toggleTheme} />
    </Grid>
    <Grid item xs={2}>
      <Sidebar />
    </Grid>
    <Grid item xs={10}>
      <MainContent elevation={8} themeMode={themeMode}>
        {children}
      </MainContent>
    </Grid>
  </Grid>
);

export default Layout;
