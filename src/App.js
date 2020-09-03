import React from 'react';
// import logo from './logo.svg';
import './App.css';
import HJETpic from './HJETpic.png';
import LoginBox from './LoginBox.js';
<<<<<<< HEAD
import CaseForm from './CaseForm.js';
=======
import CaseEdit from './components/CaseEdit/CaseEdit';
>>>>>>> setting up edit case page

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={HJETpic} />
        <LoginBox />
<<<<<<< HEAD
      </header>
    
      {/* temporary preview until we have routes set up */}
      <div>
        <CaseForm />
      </div>
=======
      </header> */}
      <CaseEdit/>
>>>>>>> setting up edit case page
    </div>
  );
}

export default App;
