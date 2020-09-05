import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import "bootstrap/dist/css/bootstrap.min.css";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


import Box from '@material-ui/core/Box';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';

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
    // Material UI Grid: https://material-ui.com/components/grid/
    <Grid container className={classes.root} spacing={0}>
      
      <React.Fragment>
        <Box textAlign="left">
          <h1> Housing Justice Evaluation Tool </h1>
          <h4> Username: </h4>
        </Box>

        {/* Grid system = 12 for full length; 12total/2items = 6 --> 6 for 2 items */}
        <Grid item xs={6}> 
          <Grid container justify="left">

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: "center",
            alignItems: "center", margin: 'auto'
          }}>
            <div>
              <BusinessCenterIcon style={{ fontSize: 300 }} />
              <p>Cases</p>   
            </div>
          
            <div>
              <AssessmentOutlinedIcon style={{ fontSize: 300 }} />
              <p>Analysis</p>
            </div>
          </div>

          </Grid>
        </Grid>
    </React.Fragment>

        
      
    </Grid>
  );

}