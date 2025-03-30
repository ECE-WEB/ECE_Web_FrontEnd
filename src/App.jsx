// src/App.js
import React from 'react';
import Root from './components/Root';
import { Container } from 'react-bootstrap';
import ChatBody from './components/community/ChatBody';
import ChatBox from './components/community/ChatBox';
const App = () => {
  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
    <Root />
    </Container>
  );
};

export default App;
