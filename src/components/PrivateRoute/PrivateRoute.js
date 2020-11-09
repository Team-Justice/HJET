import React, { Component, useContext, useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserContext from '../../context/UserContext'
import Axios from 'axios';


const PrivateRoute = (({component: Component, user, ...rest}) => {
    // const {userData, setUserData} = useContext(UserContext);
    // console.log("user: ", userData.user);
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
    
          const tokenRes = await Axios.post(
            "http://localhost:5000/users/tokenIsValid", 
            null, 
            { headers: { "x-auth-token": token } }
          );
    
          if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", {
              headers: { "x-auth-token": token },
            });
            setUserData({
              token,
              user: userRes.data,
            });
            
          }

          console.log("user data from effect: ", userData)
        };

        checkLoggedIn();
    }, []);

    useEffect(() => { console.log("auth from route: ", userData.token) }, [userData])

    return (
        <Route {...rest} render={
          props => {
            if (userData && userData.user) {
              return <Component {...rest} {...props} />
            } else {
              return <Redirect to='/login'/>
            }
          }
        } />
    )
    
});

export default PrivateRoute;