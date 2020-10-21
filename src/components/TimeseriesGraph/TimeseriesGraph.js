import React, { Component } from 'react';
import { CartesianGrid, LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { Container, Row, Dropdown, DropdownButton, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import "./TimeseriesGraph.css"
import { number } from 'yup';

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
            }, {
                date: '10/2020', number: 200
            }],
            legacyDecisionTrees: [], 
            maintainDecisionTrees: [],
            sellDecisionTrees: [],
            categorySelected: dropDownOptions[0],
            startDate: new Date(),
            endDate: new Date()

        };

        this.updateData = this.updateData.bind(this);
        this.generateBins = this.generateBins.bind(this);
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

    async handleSelect(eventKey, event) {
        var index = eventKey;
        if (eventKey == null) {
            index = 0;
        }
        await this.setState({ categorySelected: dropDownOptions[index]});
        this.updateData(dropDownOptions[index]);
    }
    
    async updateData(decisionTreeType) {
        var dataArray;
        switch (decisionTreeType) {
            case 'Legacy Wealth':
                dataArray = this.state.legacyDecisionTrees;
                break;
            case 'Maintain Home':
                dataArray = this.state.maintainDecisionTrees;
                break;
            case 'Sell Home':
                dataArray = this.state.sellDecisionTrees;
        }

        console.log(dataArray);
        const sortedDataArray = dataArray.sort((a, b) => b.createdAt - a.createdAt);
        const filteredDataArray = await sortedDataArray.filter(decisionTree => {
            var decisionTreeDate = decisionTree.createdAt;
            var date = decisionTreeDate.split("-");
            var dateYear = date[0];
            var dateMonth = date[1];
            var dateDay = date[2].split("T")[0];
            var decisionTreeNewDate = new Date(dateYear, dateMonth - 1, dateDay)
            console.log(decisionTreeNewDate); 
            return decisionTreeNewDate >= this.state.startDate && decisionTreeNewDate <= this.state.endDate;
        });

        var bins = await this.generateBins(this.state.startDate, this.state.endDate);
        filteredDataArray.forEach(decisionTree => {
            var decisionTreeDate = decisionTree.createdAt;
            var date = decisionTreeDate.split("-");
            var dateYear = date[0];
            var dateMonth = date[1];
            var monthYearString = dateMonth + '/' + dateYear;
            console.log(monthYearString);
            const binInd = bins.findIndex(bin => bin.date == monthYearString);
            console.log(binInd);
            if(binInd != -1) {
                bins[binInd].number += 1;
            }
            

        })
        this.setState({
            data: bins
        })

        console.log(bins);
    }

    generateBins(startDate, endDate) {
        var startMonth = Math.round(startDate.getMonth()) + 1; 
        var startYear = Math.round(startDate.getFullYear());
        var endMonth = Math.round(endDate.getMonth()) + 1; 
        var endYear = Math.round(endDate.getFullYear());

        var bins = [];

        if (startYear != endYear) {
            for (var i = startMonth; i <= 12; i++) {
                var month = i.toString()
                if (i <= 9) {
                    month = '0' + i.toString()
                }
                bins.push({
                    date: month.toString() + '/' + startYear.toString(),
                    number: 0
                })
            }
        }

        if (startYear == endYear) {
            
            for (var i = startMonth; i <= endMonth; i++) {
                var month = i.toString()
                if (i <= 9) {
                    month = '0' + i.toString()
                }
                bins.push({
                    date: month.toString() + '/' + startYear.toString(),
                    number: 0
                })
            }
        }
        

        if (endYear != startYear + 1 && endYear != startYear) {
            
            for (var i = startYear + 1; i <= endYear-1; i++) {
                
                for(var j = 1; j <= 12; j++) {
                    var month = j.toString()
                    if (j <= 9) {
                        month = '0' + j.toString()
                    }
                    bins.push({
                        date: month.toString() + '/' + i.toString(),
                        number: 0
                    })
                }
            }
    
        }

        if (endYear != startYear) {
            for (var i = 1; i <= endMonth; i++) {
                bins.push({
                    date: i.toString() + '/' + endYear.toString(),
                    number: 0
                })
            }
        }
    
        return bins;
    }

    async handleStartDateChange(event) {
        await this.setState({
            startDate: event
        });
        this.updateData(this.state.categorySelected);
    }

    async handleEndDateChange(event) {
        await this.setState({
            endDate: event
        });
        this.updateData(this.state.categorySelected);
    }

    render() {
        return (
            <div style={{height:'100%', width:'80%'}}>
                <h1> Time Analysis</h1>
                <ResponsiveContainer width="100%" height="70%">
                    <LineChart data={this.state.data} margin= {{top:100, right:30, left:20, bottom:50,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey = "date" label={{ value: "Month of Year", dy: 10}}/>
                        <YAxis label={{ value: "Number of Cases", angle: -90, dx: -20}} />
                        <Tooltip />
                        <Line type="monotone" dataKey="number" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                <Container height="30%">
                    <Row>
                        <Col>
                            <h4>Choose category:</h4>
                            <DropdownButton
                                variant="secondary"
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
                        </Col>  

                        <Col>
                            <h4>Choose time interval:</h4>
                            <label> Start Date</label>
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange.bind(this) }
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                            /> <br></br>

                            <label className="end-date"> End Date</label>
                            <DatePicker
                            selected={ this.state.endDate }
                            onChange={ this.handleEndDateChange.bind(this) }
                            name="endDate"
                            dateFormat="MM/dd/yyyy"
                            />
                        </Col>
                    </Row>
                </Container>
    
                
                <div>
                        
                
                    
                </div>
                
            </div>
        );
    }
}

export default TimeseriesGraph