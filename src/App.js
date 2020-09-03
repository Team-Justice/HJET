import React from 'react';
// import logo from './logo.svg';
import './App.css';
import HJETpic from './HJETpic.png';
import LoginBox from './LoginBox.js';
import CaseForm from './CaseForm.js';
import CaseEdit from './components/CaseEdit/CaseEdit';
import CaseView from './components/CaseView/CaseView';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={HJETpic} />
        <LoginBox />
      </header>
      {/* temporary preview until we have routes set up */}
      {/* <CaseForm /> */}
      {/* <CaseEdit/> */}
      <CaseView/>
    </div>
  );
}

export default App;
