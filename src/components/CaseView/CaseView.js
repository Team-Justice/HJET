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
    axios.get('http://localhost:5000/cases/') // TODO: add object id param
    .then(response => {
      this.rows= [
        createData("First Name", response.data[0].firstName),
        createData("Last Name", response.data[0].lastName),
        createData("Phone Number", response.data[0].phoneNum),
        createData("Email", response.data[0].email),
        createData("Home Address", response.data[0].homeAddress),
        createData("City", response.data[0].city),
        createData("Stateme", response.data[0].state),
        createData("Zip Code", response.data[0].zip),
        createData("Gender", response.data[0].gender),
        createData("Race", response.data[0].race),
        createData("Ethnicity", response.data[0].ethnicity),
        createData("Veteran", response.data[0].veteran),
        createData("Accomodations", response.data[0].accommodations),
        createData("Homeowner Status", response.data[0].preHomeowner),
        createData("Ownership of Current Home", response.data[0].ownershipOfHome),
        createData("Time in Home", response.data[0].timeInHome),
        createData("Home Value", response.data[0].homeValue),
        createData("Home Age", response.data[0].homeAge),
        createData("Number of Adults", response.data[0].householdAdults),
        createData("Number of Children", response.data[0].householdChildren),
        createData("Household Income", response.data[0].householdIncome),
        createData("Number of Beds", response.data[0].numBeds),
        createData("Number of Baths", response.data[0].numBaths),
        createData("Square Footage", response.data[0].numSqFootage),
        createData("Recently Renovated", response.data[0].recentlyRenovated),
        createData("Needs Renevation", response.data[0].needRenovation),
        createData("Home Description", response.data[0].homeDescription),


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
