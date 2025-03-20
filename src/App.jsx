// src/App.js
import React from 'react';
import Root from './components/Root';
import { Container } from 'react-bootstrap';
import ProfilePanel from './components/ProfilePanel';
import PopUp from './components/PopUp';


const App = () => {
  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
      <Root />
    {// <PopUp message ={"hey i am popup"} onSave ={()=>{}} onDiscard = {()=>{}} />
    }
    </Container>
  );
};

export default App;
