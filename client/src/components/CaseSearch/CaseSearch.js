import React, { useContext } from 'react';
import UserContext from "../../context/UserContext";
import axios from 'axios';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './CaseSearch.css';

// const { userData } = useContext(UserContext);

class CaseSearch extends React.Component {

    static contextType = useContext;

    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            search: '',
            caseDeleteId: '',
            deleteDialogOpen: false
        };
        this.token = ""

    }

    componentDidMount() {

        this.token = localStorage.getItem("auth-token");
        axios.get('/cases/', { 
            headers: { "x-auth-token": this.token },
            })
            .then(response => {
                this.setState({cases: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //allows table filters to not be case sensitive
    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }

    // brings up the delete dialog
    handleDelete(id) {
        this.setState({
            deleteDialogOpen: true,
            caseDeleteId: id
        })
    }	    


    deleteCase() {
        axios.delete('/cases/' + this.state.caseDeleteId, { headers: { "x-auth-token": this.token } })
            .then(res => {
                this.handleClose();
                window.location.reload(false);
            })  
    }


    handleClose() {
        this.setState({
            deleteDialogOpen: false,
            caseDeleteId: '',
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

        //combines first and last name for readability, stores in name attribute
        this.state.cases.forEach(c => {
            c.name = c.firstName + ' ' + c.lastName;
            c.createdAt = getFormattedDate(c.createdAt);
        });

        // console.log(this.state.cases.length);
        // console.log(this.state.cases);
        //
        // this.state.cases.sort((a,b) => a.name > b.name? 1: -1);
        //
        // const filteredCases = this.state.cases.filter(
        //     cases => {
        //         return cases.name.toLowerCase().indexOf(
        //             this.state.search.toLowerCase()
        //         ) !== -1
        //     }
        // );


        const Cases = this.state.cases;

        const columns = [
            {
                Header: "Name",
                accessor: "name",
                filterable: true
            },
            {
                Header: "Address",
                accessor: "homeAddress",
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
                width: 400,
                Cell: row => (
                    <div className="viewEditButtons">
                        <Link to={"/caseView/" + row.original._id} className="btn btn-primary">View</Link>
                        <Link to={"/caseEdit/" + row.original._id} className="btn btn-primary">Edit</Link>
                        <Link to={'/decisionTreeCategories/' + row.original._id} className="btn btn-primary">Add a Decision Tree</Link>
                        <Link className="btn btn-danger" onClick={() => this.handleDelete(row.original._id)}>Delete</Link>
                    </div>
                )
            }
        ]

        return (
            <div>
                <h1>Search Cases</h1>

                <ReactTable
                    data = {Cases}
                    columns={columns}
                    showPagination={false}
                    pageSize={Cases.length}
                    defaultFilterMethod={this.filterMethod}
                />
                <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure you want to delete this case?</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleClose()} color="grey">
                        Cancel
                    </Button>
                    <Button onClick={() => this.deleteCase()} color="secondary" autoFocus>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CaseSearch