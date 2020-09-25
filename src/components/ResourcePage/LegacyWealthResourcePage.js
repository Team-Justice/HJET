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

export default class LegacyWealthResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.decisionTreeRows = [];
        this.decisionTreeResources = resources.legacyDecisionTree;
        this.newResources = [];

        this.state = {
            resourcesToRenderState : []
        }

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        // get case info for that decision tree
        axios.get("http://localhost:5000/legacy-wealth-building/" + id)
        .then(response => {
            console.log(response);
            this.decisionTreeRows = [
                createData("needHomeRenovation", response.data.needHomeRenovation),
                createData("wantToAttendWealthSeminar", response.data.wantToAttendWealthSeminar),
                createData("haveReverseMortgage", response.data.haveReverseMortgage),
                createData("needMortgageOrDeedTransfer", response.data.needMortgageOrDeedTransfer),
                createData("wantFirstTimeBuyersCourse", response.data.wantFirstTimeBuyersCourse),
                createData("needHealthyHomeInspection", response.data.needHealthyHomeInspection),
                createData("needEnergyEfficiencyInspection", response.data.needEnergyEfficiencyInspection),
                createData("planToAbandonHome", response.data.planToAbandonHome),
                createData("needFinancialAssistance", response.data.needFinancialAssistance),
                createData("needEmploymentAssistance", response.data.needEmploymentAssistance),
                createData("knowAboutHUDAssistance", response.data.knowAboutHUDAssistance),
                createData("haveOwnershipNeeds", response.data.haveOwnershipNeeds),
                createData("haveFamilySuccessivePlan", response.data.haveFamilySuccessivePlan),
                createData("needFinancialCounseling", response.data.needFinancialCounseling)
            ];
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