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
        <div className="title" key={re.title}><h2>{re.title}</h2></div>
        <div className="answer" key={re.answer}><p1>{re.answer}</p1></div>
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

        this.token = localStorage.getItem("auth-token");

        const {id} = this.props.match.params;

        // get case info for that decision tree
        axios.get("/sell-House/" + id, { 
            headers: { "x-auth-token": this.token }
        }).then(response => {
            this.decisionTreeRows = [
                createData("wantHomeWealthGenerationCourse", response.data.wantHomeWealthGenerationCourse),
                createData("wantFirstTimeBuyersCourse", response.data.wantFirstTimeBuyersCourse),
                createData("wantToSellToInvestor", response.data.wantToSellToInvestor),
                createData("wantToUseBroker", response.data.wantToUseBroker),
                createData("needFinancialAssistance", response.data.needFinancialAssistance),
                createData("needFinancialCounseling", response.data.needFinancialCounseling),
                createData("needHomeRenovation", response.data.needHomeRenovation),
                createData("needKnowledgeOfSellingOptions", response.data.needKnowledgeOfSellingOptions),
                createData("needManagingAssistance", response.data.needManagingAssistance),
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
            console.log(value2);
            if (value2.field == "sellingHouseReason") {
                this.newResources.push({title: "Selling House Reason", answer: value2.value});
            } else {
                if (value2.value == true) {
                    let specificResource = this.decisionTreeResources[value2.field];
                    this.newResources.push(specificResource);
                }
            }
        }
        this.setState({
            resourcesToRenderState : this.newResources,
        });
        console.log(this.resourcesToRenderState);
        console.log(this.newResources);
    }

    render() {
        console.log(this.decisionTreeResources);
        console.log(this.state.resourcesToRenderState);
        return (
            <div>
                <h1>Resource Page : Sell House</h1>
                <Test resources={this.state.resourcesToRenderState} />
            </div>
        );
    }
}