// src/App.js
import React from 'react';
import Root from './components/Root';
import { Container } from 'react-bootstrap';


const App = () => {
  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
      <Root /> 
    </Container>
  );
};

export default App;
