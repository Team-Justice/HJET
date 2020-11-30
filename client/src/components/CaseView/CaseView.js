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
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";


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
    this.caseID = "";
    this.treeType = {
      a: "Legacy"
    }
    this.state = {
      legacy: [],
      maintainCurrHomeData: [],
      sellHouse: []
    };
    this.token = ""
  }

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
  }
   
  componentDidMount() {
    const {id} = this.props.match.params;
    this.caseID = id;
    console.log("constant id is " + id);
    console.log("CaseID is " + this.caseID);
    this.token = localStorage.getItem("auth-token");
    axios.get('/cases/' + id, { headers: { "x-auth-token": this.token } })
    .then(response => {
      this.rows= [
        createData("First Name", response.data.firstName),
        createData("Last Name", response.data.lastName),
        createData("Phone Number", response.data.phoneNum),
        createData("Email", response.data.email),
        createData("Home Address", response.data.homeAddress),
        createData("City", response.data.city),
        createData("State", response.data.state),
        createData("Zip Code", response.data.zip),
        createData("Gender", response.data.gender),
        createData("Race", response.data.race),
        createData("Ethnicity", response.data.ethnicity),
        createData("Veteran", response.data.veteran.toString()),
        createData("Accomodations", response.data.accommodations.toString()),
        createData("Homeowner Status", response.data.preHomeowner.toString()),
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
      console.log("response.data", response.data)
    })
    .catch(error => {
      console.log("Error: ", error);
    })

    // Decision tree 
    axios.get('/legacy-wealth-building/case/' + this.caseID, { headers: { "x-auth-token": this.token } })
      .then(response => {
        console.log(response)
        this.setState({legacy: response.data});
      })
      .catch(error => {
        console.log("Error: ", error);
      })
    
    axios.get('/maintain-current-home/case/' + this.caseID, { headers: { "x-auth-token": this.token } })
      .then(response => {
        console.log(response)
        this.setState({maintainCurrHomeData: response.data});
      })
      .catch(error => {
        console.log("Error: ", error);
      })

    axios.get('/sell-House/case/' + this.caseID, { headers: { "x-auth-token": this.token } })
      .then(response => {
        console.log(response)
        this.setState({sellHouse: response.data});
      })
      .catch(error => {
        console.log("Error: ", error);
      })
    }

  render() {
    function getFormattedDate(createdAt) {
      var date = new Date(createdAt);
      
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;

      return month + '/' + day + '/' + year ;
    }

    const decisionTrees = this.state.legacy.concat(this.state.maintainCurrHomeData).concat(this.state.sellHouse);
    decisionTrees.forEach(dt => {
      dt.createdAt = getFormattedDate(dt.createdAt);
    });

    const columns = [
      {
          Header: "Tree Type",
          accessor: "type",
          filterable: true
      },
      {
          Header: "Date Created",
          accessor: "createdAt",
          sortable: false
      },
      {
          Header: "",
          accessor: "_id",
          width: 200,
          Cell: row => (
              <div className="viewEditButtons">
                  <Link to={"/resources/" + row.original.type + "/" + row.original._id} className="btn btn-primary">Resources</Link>
              </div>
          )
      }
    ]
    return (
      <div className="viewDT-container">
        <div className="viewDT-content">
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
          <div className="button-container">
            <Link to={'/decisionTreeCategories/' + this.caseID}><Button variant="outline-secondary" className="addDT-button">Add a Decision Tree</Button></Link>
          </div>
          <ReactTable
            data = {decisionTrees}
            columns={columns}
            showPagination={false}
            pageSize={decisionTrees.length}
            defaultFilterMethod={this.filterMethod}
          />
          </div>
      </div>
    );
  }


}
