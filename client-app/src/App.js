import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Main />
      </div>
    </HashRouter>
  );
}


export default App;
