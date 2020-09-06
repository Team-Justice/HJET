import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    // <Box textAlign="center">
    //   <div>Hello World</div>
    //   <h1>Hello World</h1>
    // </Box>
    // <BusinessCenterIcon style={{ fontSize: 300 }} />

    <React.Fragment>
      <Box textAlign="center">
        <h1> Cases </h1>
      </Box>

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: "center",
        alignItems: "center", margin: 'auto'
      }}>
        <div>
          <Link to="/caseForm">
            <AddIcon style={{ fontSize: 300 }} />
            <p>New Cases </p>  
          </Link>  
        </div>
      
        <div>
          <Link to="/caseSearch">
            <FindInPageIcon style={{ fontSize: 300 }} />
            <p>Search</p>
          </Link>
        </div>
      </div>
      
    </React.Fragment>
    
    // Material UI Grid: https://material-ui.com/components/grid/
    
  );

}