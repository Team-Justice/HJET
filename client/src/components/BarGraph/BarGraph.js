import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer} from 'recharts';
import { Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import "./BarGraph.css"


class BarGraph extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
        var start = new Date();
        start.setMonth(start.getMonth() - 3);
        this.setState({
            startDate: start
        });
        this.token = localStorage.getItem("auth-token");

        const legacyDT = await axios.get('/legacy-wealth-building/cases', { 
            headers: { "x-auth-token": this.token }
        });

        this.setState({
            legacyDecisionTrees: legacyDT.data
        });

        const maintainDT = await axios.get('/maintain-current-home/cases', { 
            headers: { "x-auth-token": this.token }
        });

        this.setState({
            maintainDecisionTrees: maintainDT.data
        });

        const sellDT = await axios.get('/sell-House/cases', { 
            headers: { "x-auth-token": this.token }
        });
        this.setState({
            sellDecisionTrees: sellDT.data
        });
        this.updateData();


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
        

        var newData = [];
        newData.push({
            "name": "Legacy Wealth",
            "cases": filteredLegacyDT.length,
        });
        newData.push({
            "name": "Maintain Home",
            "cases": filteredMaintainDT.length,
        });
        newData.push({
            "name": "Sell Home",
            "cases": filteredSellDT.length,
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
            <div style={{height:'100%', width:'80%'}}>
                <h1>Category Analysis</h1>
                <ResponsiveContainer width="100%" height="70%">
                    <BarChart data = {this.state.data} margin= {{top:100, right:30, left:20, bottom:50,}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey = "name" label={{value: "Case Category", dy:20}} />
                        <YAxis label={{ value: "Number of Cases", angle: -90, dx: -0}} />
                        <Tooltip />
                        <Bar dataKey="cases" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
                <Container>
                    <Row>
                        <Col>
                            <h4>Choose time interval:</h4>
                            <label>Start Date</label>
                            <DatePicker
                                selected={ this.state.startDate }
                                onChange={ this.handleStartDateChange.bind(this) }
                                name="startDate"
                                dateFormat="MM/dd/yyyy"
                            /> <br></br>

                            <label className="end-date">End Date</label>
                            <DatePicker
                                selected={ this.state.endDate }
                                onChange={ this.handleEndDateChange.bind(this) }
                                name="endDate"
                                dateFormat="MM/dd/yyyy"
                            />
                        </Col>
                    </Row>
                </Container>
          </div>
        );
    }
}

export default BarGraph