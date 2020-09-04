import React from 'react';
// import logo from './logo.svg';
import './App.css';
import HJETpic from './HJETpic.png';
import LoginBox from './LoginBox.js';
import CaseForm from './CaseForm.js';
import CaseEdit from './components/CaseEdit/CaseEdit';
import CaseView from './components/CaseView/CaseView';
import CaseSearch from './CaseSearch';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component ={CaseSearch} />  {/*this line should be changed to homepage later*/}
          <Route path="/caseForm" exact component={CaseForm} />
          <Route path="/caseEdit/:id" component = {CaseEdit}/>
          <Route path="/caseView/:id" exact component={CaseView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
