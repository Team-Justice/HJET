import React,  { useState, useEffect }  from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';


const PrivateRoute = ({component: Component, ...rest}) => {
    const [userData, setUserData] = useState({
        token: undefined, 
        user: undefined,
    });
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        let mounted = true;
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("auth-token");
          if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
          }
          console.log("token")
          console.log(token)
    
          const tokenRes = await Axios.post(
            "http://localhost:5000/users/tokenIsValid", 
            null, 
            { headers: { "x-auth-token": token } }
          );
        
          if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", {
              headers: { "x-auth-token": token },
            });
            if (mounted) {
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
            
          }
        };    
        checkLoggedIn();
        setAuthChecked(true);
        return () => mounted = false;
        // return () => {
        //     isCancelled = true;
        // };
    },[]);

    if (!authChecked) {
        return null;
    }

    console.log("token from private route: ", userData.token)

    // if (userData === undefined) {
    //     return <>Still loading...</>;
    // } else {
    //     return (
    //         <Route {...rest} render={props => (
    //             (userData && userData.token) ?
    //                 <Component {...props} />
    //             : <Redirect to="/login" />
    //         )} />
    //     );
    // }

    return (
        <Route {...rest} render={props => (
            (userData && userData.token) ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
   
    
};

export default PrivateRoute;