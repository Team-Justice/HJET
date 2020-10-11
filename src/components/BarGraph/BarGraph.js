import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid} from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

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
            endDate: new Date(),
            legacyDecisionTrees: [],
            maintainDecisionTrees: [],
            sellDecisionTrees: []
        }

        this.updateData = this.updateData.bind(this);
        this.filterData = this.filterData.bind(this);

    }

    async componentDidMount() {
        const legacyDT = await axios.get('http://localhost:5000/legacy-wealth-building/cases');
        this.setState({
            legacyDecisionTrees: legacyDT.data
        });

        const maintainDT = await axios.get('http://localhost:5000/maintain-current-home/cases');
        this.setState({
            maintainDecisionTrees: maintainDT.data
        });

        const sellDT = await axios.get('http://localhost:5000/sell-House/cases');
        this.setState({
            sellDecisionTrees: sellDT.data
        });

    }

    async handleStartDateChange(event) {
        await this.setState({
            startDate: event
        });
        this.updateData();
    }

    async handleEndDateChange(event) {
        await this.setState({
            endDate: event
        });
        this.updateData();
    }

    async updateData() {
        
        var filteredLegacyDT = this.filterData(this.state.legacyDecisionTrees);
        var filteredMaintainDT = this.filterData(this.state.maintainDecisionTrees);
        var filteredSellDT = this.filterData(this.state.sellDecisionTrees);
        
        console.log(filteredLegacyDT);

        var newData = [];
        newData.push({
            "name": "Legacy Wealth",
            "number": filteredLegacyDT.length,
        });
        newData.push({
            "name": "Maintain Home",
            "number": filteredMaintainDT.length,
        });
        newData.push({
            "name": "Sell Home",
            "number": filteredSellDT.length,
        })

        this.setState({
            data: newData
        })

    }

    filterData(dataArray) {
        const sortedDataArray = dataArray.sort((a, b) => b.createdAt - a.createdAt);
        const filteredDataArray = sortedDataArray.filter(decisionTree => {
            var decisionTreeDate = decisionTree.createdAt;
            var date = decisionTreeDate.split("-");
            var dateYear = date[0];
            var dateMonth = date[1];
            var dateDay = date[2].split("T")[0];
            var decisionTreeNewDate = new Date(dateYear, dateMonth - 1, dateDay)
            return decisionTreeNewDate >= this.state.startDate && decisionTreeNewDate <= this.state.endDate;
        });
        return filteredDataArray;
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