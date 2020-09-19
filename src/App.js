import React from 'react';
import './App.css';
import CaseForm from './components/CaseForm/CaseForm.js';
import CaseEdit from './components/CaseEdit/CaseEdit';
import CaseView from './components/CaseView/CaseView';
import CaseSearch from './CaseSearch';
import MainMenu from './components/MainMenu/MainMenu';
import Cases from './components/Cases/Cases';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div>
      <NavBar/>
      <Router>
          <Switch>
            <Route path="/" exact component ={MainMenu} /> 
            <Route path="/caseForm" exact component={CaseForm} />
            <Route path="/caseEdit/:id" component = {CaseEdit}/>
            <Route path="/caseView/:id" exact component={CaseView} />
            <Route path="/caseSearch" exact component = {CaseSearch} />
            <Route path="/cases" exact component = {Cases} />
          </Switch>

      </Router>
    </div>

  );
}

export default App;