import React from 'react';
import logo from './logo.svg';
import './App.css';
import HJETpic from './HJETpic.png';
import LoginBox from './LoginBox.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={HJETpic} />
        <LoginBox />
      </header>
    </div>
  );
}

export default App;
