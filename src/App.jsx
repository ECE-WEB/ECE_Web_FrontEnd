// src/App.js
import React from 'react';
import Root from './components/Root';
import SidePanel from './components/SidePanel';
import MainContent from './components/NavBar';
import { Container } from 'react-bootstrap';
import ProfilePanel from './components/ProfilePanel';

const App = () => {
  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
      <ProfilePanel></ProfilePanel> 
    </Container>
  );
};

export default App;
