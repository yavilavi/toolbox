import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../header/navbar';
import ContentContainer from '../content/ContentContainer';
import Footer from '../../footer';

function App() {
  return (
    <BrowserRouter>
      <div className="w-100">
        <NavBar />
        <ContentContainer />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
