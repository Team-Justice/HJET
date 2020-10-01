import React, { Component } from 'react';
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const dropDownOptions = ['Legacy Wealth', 'Maintain Home', 'Sell Home'];

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
            }],
            categorySelected: dropDownOptions[0],
            startDate: new Date(),
            endDate: new Date()
        };
    }

    handleSelect(eventKey, event) {
        var index = eventKey;
        if (eventKey == null) {
            index = 0;
        }
        this.setState({ categorySelected: dropDownOptions[index]});
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
                <h1>Time Analysis</h1>
                <LineChart width={500} height={300} data={this.state.data} margin= {{top:5, right:30, left:20, bottom:5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey = "date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="number" stroke="#82ca9d" />
                </LineChart>
                <DropdownButton
                    title={this.state.categorySelected}
                    id="document-type"
                    onSelect={this.handleSelect.bind(this)}
                >
                    {dropDownOptions.map((opt, i) => (
                    <Dropdown.Item key={i} eventKey={i}>
                        {opt}
                    </Dropdown.Item>
                    ))}
                </DropdownButton>
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

export default TimeseriesGraph