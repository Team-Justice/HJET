import React from 'react';
import * as resources from "./DecisionTreeConstants";
import axios from 'axios';

function createData(field, value) {
    return { field, value };
  }


  const Test = ({resources}) => (
    <div>
      {resources.map(re => (
        <div>
        <div className="title" key={re.title}>{re.title}</div>
        <div className="answer" key={re.answer}>{re.answer}</div>
        </div>
      ))}
    </div>
  ); 

export default class MaintainHouseResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.decisionTreeRows = [];
        this.decisionTreeResources = resources.maintainDecisionTree;
        this.newResources = [];

        this.state = {
            resourcesToRenderState : []
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        // get case info for that decision tree
        axios.get("http://localhost:5000/maintain-current-home/" + id)
        .then(response => {
            this.decisionTreeRows = [
                createData("needSignificantRepairs", response.data.needSignificantRepairs),
                createData("needHealthyHomeAudit", response.data.needHealthyHomeAudit),
                createData("needEnergyEfficiencyAudit", response.data.needEnergyEfficiencyAudit),
                createData("needRenovationResources", response.data.needRenovationResources),
                createData("needFinancingAssistance", response.data.needFinancingAssistance),
                createData("needFinancialAssistance", response.data.needFinancialAssistance),
                createData("needFinancialCounseling", response.data.needFinancialCounseling),
                createData("needEmploymentCounseling", response.data.needEmploymentCounseling),
                createData("soleHomeowner", response.data.soleHomeowner),
                createData("oweBackTaxes", response.data.oweBackTaxes),
                createData("reverseMortgage", response.data.reverseMortgage),
                createData("comfortableInCommunity", response.data.comfortableInCommunity),
                createData("timeInCommunity", response.data.timeInCommunity),
            ];
            this.setState({
                decisionTreeRowsState : this.decisionTreeRows,
            });
            this.createListOfResources();
        })
        .catch(error => {
            console.log("Error: ", error);
          });
    }

    createListOfResources() {
        for (const [keyHere, value] of Object.entries(this.decisionTreeRows)) {
            let value2 = value;
            if (value2.value == true) {
                let specificResource = this.decisionTreeResources[value2.field];
                this.newResources.push(specificResource);
            }
        }
        this.setState({
            resourcesToRenderState : this.newResources,
        })
    }

    render() {
        return (
            <div>
                <h1>Resource Page</h1>
                <h2>Test</h2>
                <Test resources={this.state.resourcesToRenderState} />
            </div>
        );
    }
}