import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Axios from 'axios';
import UserContext from './context/UserContext';
import LoginPage from './components/LoginPage/LoginPage'
import CaseForm from './components/CaseForm/CaseForm';
import CaseEdit from './components/CaseEdit/CaseEdit';
import CaseView from './components/CaseView/CaseView';
import CaseSearch from './components/CaseSearch/CaseSearch';
import MainMenu from './components/MainMenu/MainMenu';
import Cases from './components/Cases/Cases';
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

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("auth-token") ? 
      <Component {...props}/>
      : <Redirect to='/login'/>
  )}/>
) 

function App() {
  
  const [userData, setUserData] = useState({
    token: undefined, 
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      console.log("token")
      console.log(token)

      const tokenRes = await Axios.post(
        "/users/tokenIsValid", 
        null, 
        { headers: { "x-auth-token": token } }
      );
    
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });

        
      }
    };

    checkLoggedIn();
  }, []);



  return (
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
              <Route path="/" exact component ={LoginContainer}/>
              <Route path="/login" component={LoginContainer}/>
              <Route component={DefaultContainer}/>
            </Switch>
        </UserContext.Provider>
      </Router>
  );
}

// This part does not contain a NavBar
const LoginContainer = () => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginPage} />
  </div>
)


// This container includes a top NavBar
const DefaultContainer = () => (
  <div id="container">
      <Router>
        <PrivateRoute path="/" component={NavBar}/>
        <div id="route-container">
        <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/mainMenu" exact component ={MainMenu}/>
            <PrivateRoute path="/caseForm" exact component={CaseForm}/>
            <PrivateRoute path="/caseEdit/:id" component = {CaseEdit}/>
            <PrivateRoute path="/caseView/:id" exact component={CaseView}/>
            <PrivateRoute path="/caseSearch" exact component = {CaseSearch}/>
            <PrivateRoute path="/cases" exact component = {Cases}/>
            <PrivateRoute path="/decisionTreeCategories/:id" exact component = {DTCategories}/>
            <PrivateRoute path="/decisionTreeCategories/legacy/:id" exact component = {LegacyDT}/>
            <PrivateRoute path="/decisionTreeCategories/maintain/:id" exact component = {MaintainDT}/>
            <PrivateRoute path="/decisionTreeCategories/sell/:id" exact component = {SellDT}/>
            <PrivateRoute path="/resources/Legacy Wealth Building/:id" exact component = {LegacyWealthResourcePage} />
            <PrivateRoute path="/resources/Maintain Current Home/:id" exact component = {MaintainHouseResourcePage} />
            <PrivateRoute path="/resources/Sell House/:id" exact component = {SellHouseResourcePage} />
            <PrivateRoute path="/analysis" exact component = {AnalysisMenu} />
            <PrivateRoute path="/timeAnalysis" exact component = {TimeseriesGraph} />
            <PrivateRoute path="/categoryAnalysis" exact component = {BarGraph} />
            <PrivateRoute path="/newUser" exact component = {NewUserPage} />
          </Switch>
        </div>
      </Router>
    </div>
)

export default App;