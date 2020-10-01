import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid} from 'recharts';

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
              }]
        }
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
            </div>
        );
    }
}

export default BarGraph