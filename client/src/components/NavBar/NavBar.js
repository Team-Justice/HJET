import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './HJETpiclogo.png';
import {Link} from 'react-router-dom';
import './NavBar.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';


const useStyles = theme => ({
  title: {
    margin: '0 5rem',

  }
});

class NavBar extends React.Component {
    logout() {
      window.localStorage.clear();
      window.location.href = "/";
    }

    render() {
      const { classes } = this.props;
      let isAdmin = localStorage.getItem("isAdmin");
      
        return (
          <div className={classes.root}>
            <AppBar className={classes.appbar} position="static" color="transparent">
              <Toolbar>
                <IconButton href="/mainMenu">
                  <img src={logo} width="30rem" height="30rem" className="d-inline-block align-top" alt="HJET logo"/>
                </IconButton>
                <Button href="/mainMenu" color="inherit">Back To Home</Button>
              
                <Typography className={classes.title} variant="h6">Welcome to the Housing Justice Evaluation Tool!</Typography>

                <div style={{position: "absolute", right: 0, paddingRight: "10px", display: "flex", justifyContent: "space-between"}}>
                  {/* if isAdmin == true, allow to Create New User */}
                  {isAdmin == "true" && <Button href = "/NewUser">Create New User</Button>}

                  <Button onClick={() => this.logout()} variant="contained" disableElevation>Logout</Button>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        )
      
    }
}

export default withStyles(useStyles) (NavBar);