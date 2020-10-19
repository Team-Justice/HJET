import React from 'react';
import './App.css';
import CaseForm from './components/CaseForm/CaseForm.js';
import CaseEdit from './components/CaseEdit/CaseEdit';
import CaseView from './components/CaseView/CaseView';
import CaseSearch from './components/CaseSearch/CaseSearch';
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
import AnalysisMenu from './components/AnalysisMenu/AnalysisMenu';
import BarGraph from './components/BarGraph/BarGraph';
import TimeseriesGraph from './components/TimeseriesGraph/TimeseriesGraph';
import NewUserPage from './components/NewUserPage/NewUserPage';



function App() {
  return (
    <div id="container">
      <NavBar/>
      <Router>
        <div id="route-container">
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
            <Route path="/resources/Legacy Wealth Building/:id" exact component = {LegacyWealthResourcePage} />
            <Route path="/resources/Maintain Current Home/:id" exact component = {MaintainHouseResourcePage} />
            <Route path="/resources/Sell House/:id" exact component = {SellHouseResourcePage} />
            <Route path="/analysis" exact component = {AnalysisMenu} />
            <Route path="/timeAnalysis" exact component = {TimeseriesGraph} />
            <Route path="/categoryAnalysis" exact component = {BarGraph} />
            <Route path="/newUser" exact component = {NewUserPage} />
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;