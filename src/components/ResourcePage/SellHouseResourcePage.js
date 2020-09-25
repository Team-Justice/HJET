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
        this.decisionTreeResources = resources.SellDecisionTree;
        this.newResources = [];

        this.state = {
            resourcesToRenderState : []
        }

    }

    componentDidMount() {
        const {id} = this.props.match.params;

        // get case info for that decision tree
        axios.get("http://localhost:5000/sell-House/" + id)
        .then(response => {
            this.decisionTreeRows = [
                createData("wantHomeWealthGenerationCourse", response.data.wantHomeWealthGenerationCourse),
                createData("wantFirstTimeBuyersCourse", response.data.wantFirstTimeBuyersCourse),
                createData("wantToSellToInvestor", response.data.wantToSellToInvestor),
                createData("wantToUseBroker", response.data.wantToUseBroker),
                createData("needFinancialAssistance", response.data.needFinancialAssistance),
                createData("needFinancialCounseling", response.data.needFinancialCounseling),
                createData("needHomeRenovation", response.data.needHomeRenovation),
                createData("needKnowledgeOfSellingOptions", response.data.needKnowledgeOfSellingOptions),
                createData("needManagingAssitance", response.data.needManagingAssistance),
                createData("needProfessionalCounselor", response.data.needProfessionalCounselor),
                createData("needHealthyHomeInspection", response.data.needHealthyHomeInspection),
                createData("needEnergyEfficiencyInspection", response.data.needEnergyEfficiencyInspection),
                createData("oweBackTaxes", response.data.oweBackTaxes),
                createData("usedHUDCounselor", response.data.usedHUDCounselor),
                createData("sellingHouseReason", response.data.sellingHouseReason),
                createData("familyWillingToTakeOver", response.data.familyWillingToTakeOver),
                createData("haveReverseMortgage", response.data.haveReverseMortgage),
                createData("houseDegredationBeyondRepair", response.data.houseDegredationBeyondRepair),
                createData("needSignificantRepairs", response.data.needSignificantRepairs)
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