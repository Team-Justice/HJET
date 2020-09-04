import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CaseView.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(field, value) {
  return { field, value };
}

export default class CaseView extends Component {
  constructor(props) {
    super(props);
    this.rows = []
  }
   
  componentDidMount() {
    const {id} = this.props.match.params;
    axios.get('http://localhost:5000/cases/' + id) // TODO: add object id param
    .then(response => {
      this.rows= [
        createData("First Name", response.data.firstName),
        createData("Last Name", response.data.lastName),
        createData("Phone Number", response.data.phoneNum),
        createData("Email", response.data.email),
        createData("Home Address", response.data.homeAddress),
        createData("City", response.data.city),
        createData("Stateme", response.data.state),
        createData("Zip Code", response.data.zip),
        createData("Gender", response.data.gender),
        createData("Race", response.data.race),
        createData("Ethnicity", response.data.ethnicity),
        createData("Veteran", response.data.veteran),
        createData("Accomodations", response.data.accommodations),
        createData("Homeowner Status", response.data.preHomeowner),
        createData("Ownership of Current Home", response.data.ownershipOfHome),
        createData("Time in Home", response.data.timeInHome),
        createData("Home Value", response.data.homeValue),
        createData("Home Age", response.data.homeAge),
        createData("Number of Adults", response.data.householdAdults),
        createData("Number of Children", response.data.householdChildren),
        createData("Household Income", response.data.householdIncome),
        createData("Number of Beds", response.data.numBeds),
        createData("Number of Baths", response.data.numBaths),
        createData("Square Footage", response.data.numSqFootage),
        createData("Recently Renovated", response.data.recentlyRenovated),
        createData("Needs Renevation", response.data.needRenovation),
        createData("Home Description", response.data.homeDescription),


      ]
      console.log("updateing rown", this.rows)
      this.setState({}) // TODO: figure out why we can't get rid of this line
    })
    .catch(error => {
      console.log("Error: ", error);
    })
    
  }

  render() {
    return (
      <div>
        <h4>View Case</h4>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        
        <TableBody>
          {this.rows.map((row) => (
            <TableRow >
              <TableCell align="left">{row.field}</TableCell>
              <TableCell component="th" scope="row">{row.value}</TableCell>
          
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    </div>
    );
  }


}
