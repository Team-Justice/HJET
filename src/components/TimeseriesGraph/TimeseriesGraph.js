import React, { Component } from 'react';
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

class TimeseriesGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                date: '07/2020', number: 200 
            },
            {
                date: '08/2020', number: 150 

            },
            {
                date: '09/2020', number: 250 
            }]
        }
    }
    render() {

        return (
            <div>
                <h1>Time Analysis</h1>
                <LineChart width={500} height={300} data={this.state.data} margin= {{top:5, right:30, left:20, bottom:5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey = "date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="number" stroke="#82ca9d" />
                </LineChart>
            </div>
        );
    }
}

export default TimeseriesGraph