// src/App.js
import React from 'react';
import Root from './components/Root';
import SidePanel from './components/SidePanel';
import MainContent from './components/NavBar';
import { Box } from '@mui/material';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container fluid>
      <Root></Root>
    </Container>
  );
};

export default App;
