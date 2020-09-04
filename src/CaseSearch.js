import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Link} from 'react-router-dom';



class CaseSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            cases: [],
            search: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/cases/')
            .then(response => {
                this.setState({cases: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // updateSearch(e) {
    //     this.setState({
    //         search: e.target.value
    //     });
    // }

    //allows table filters to not be case sensitive
    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }

    handleEdit(id) {

    }

    handleView(id) {

    }

    render() {

        //combines first and last name for readability, stores in name attribute
        this.state.cases.forEach(
            c => c.name = c.firstName + ' ' + c.lastName
        );

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
                width: 200,
                Cell: row => (
                    <div className="viewEditButtons">
                        <Link to={"/caseView/" + row.original._id} className="btn btn-primary">View</Link>
                        <Link to={"/caseEdit/" + row.original._id} className="btn btn-primary">Edit</Link>
                    </div>
                )
            }
        ]

        return (
            <div>
                <h1>Search Cases</h1>

                {/*old search input*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    value={this.state.search}*/}
                {/*    placeholder="Search"*/}
                {/*    onChange={this.updateSearch.bind(this)}*/}
                {/*/>*/}


                <ReactTable
                    data = {Cases}
                    columns={columns}
                    showPagination={false}
                    pageSize={Cases.length}
                    defaultFilterMethod={this.filterMethod}
                />
            </div>
        );
    }
}

export default CaseSearch