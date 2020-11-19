import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import "bootstrap/dist/css/bootstrap.min.css";
import BarChart from '@material-ui/icons/BarChart';
import Timeline from '@material-ui/icons/Timeline';

import {Link} from 'react-router-dom';


import Box from '@material-ui/core/Box';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
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
    // Material UI Grid: https://material-ui.com/components/grid/
    // <Grid container className={classes.root} spacing={0}>
      
      <React.Fragment>
      <Box textAlign="center">
            <h1> Analysis </h1>
      </Box>

        {/* Grid system = 12 for full length; 12total/2items = 6 --> 6 for 2 items */}
        {/* <Grid item xs={6}> 
          <Grid container> */}


          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: "center",
            alignItems: "center", margin: 'auto', textAlign: "center"
          }}>

            <div>
              <Link to="/timeAnalysis">
                <Timeline style={{ fontSize: 300 }} />
                <p>Time Analysis</p> 
              </Link>
            </div>
          
            <div>
              <Link to="/categoryAnalysis">  
                <BarChart style={{ fontSize: 300 }} />
                <p>Category Analysis</p>
              </Link>
            </div>
          </div>
{/* 
          </Grid>
        </Grid> */}
    </React.Fragment>
      
    // </Grid>
  );

}