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
import DTCategories from './components/DTCategories/DTCategories';
import LegacyDT from './components/LegacyDecisionTree/LegacyDecisionTree';
import MaintainDT from './components/MaintainHouseDecisionTree/MaintainHouseDecisionTree';
import SellDT from './components//SellDecisionTree/SellDecisionTree';
import LegacyWealthResourcePage from './components/ResourcePage/LegacyWealthResourcePage';
import MaintainHouseResourcePage from './components/ResourcePage/MaintainHouseResourcePage';
import SellHouseResourcePage from './components/ResourcePage/SellHouseResourcePage';


function App() {
  return (
    <div>
      <NavBar/>
      <Router>
          <Switch>
            <Route path="/" exact component ={MainMenu}/> 
            <Route path="/caseForm" exact component={CaseForm}/>
            <Route path="/caseEdit/:id" component = {CaseEdit}/>
            <Route path="/caseView/:id" exact component={CaseView}/>
            <Route path="/caseSearch" exact component = {CaseSearch}/>
            <Route path="/cases" exact component = {Cases}/>
            <Route path="/decisionTreeCategories/:id" exact component = {DTCategories}/>
            <Route path="/decisionTreeCategories/legacy/:id" exact component = {LegacyDT}/>
            <Route path="/decisionTreeCategories/maintain/:id" exact component = {MaintainDT}/>
            <Route path="/decisionTreeCategories/sell/:id" exact component = {SellDT}/>
            <Route path="/decisionTreeResources/legacy/:id" exact component = {LegacyWealthResourcePage} />
            <Route path="/decisionTreeResources/maintain/:id" exact component = {MaintainHouseResourcePage} />
            <Route path="/decisionTreeResources/sell/:id" exact component = {SellHouseResourcePage} />
          </Switch>

      </Router>
    </div>

  );
}

export default App;