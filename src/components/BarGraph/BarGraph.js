import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid} from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class BarGraph extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "name": "Legacy Wealth",
                "number": 4000,
              },
              {
                "name": "Maintain Home",
                "number": 3000,
              },
              {
                "name": "Sell Home",
                "number": 2000,
              }],
              startDate: new Date(),
              endDate: new Date()
        }

    }

    handleStartDateChange(event) {
        this.setState({
            startDate: event
        });
    }

    handleEndDateChange(event) {
        this.setState({
            endDate: event
        });
    }

    render() {

        return (
            <div>
                <h1>Category Analysis</h1>
                <BarChart width = {730} height = {250} data = {this.state.data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey = "name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="number" fill="#82ca9d" />
                </BarChart>
                <div>
                    <label> Start Date</label>
                    <DatePicker
                    selected={ this.state.startDate }
                    onChange={ this.handleStartDateChange.bind(this) }
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                    />
                </div>
                <div>
                    <label> End Date</label>
                    <DatePicker
                    selected={ this.state.endDate }
                    onChange={ this.handleEndDateChange.bind(this) }
                    name="endDate"
                    dateFormat="MM/dd/yyyy"
                    />
                </div>
          </div>
        );
    }
}

export default BarGraph