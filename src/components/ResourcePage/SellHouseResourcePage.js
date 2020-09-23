import React from 'react';
import * as resources from "./DecisionTreeConstants";
import axios from 'axios';
import {TitleResourceInfo} from './TitleResourceInfo';

function createData(field, value) {
    return {field: value};
}

export default class LegacyWealthResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.decisionTreeRows = [];
        this.decisionTreeResources = resources.SellDecisionTree;
        this.resourcesToRender = [];
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
        });
    }

    createListOfResources() {
        for (const [keyHere, value] of Object.entries(this.decisionTreeResources)) {
            let key2 = keyHere;
            let value2 = value;
            let individualResourceTrue = this.decisionTreeRows.find(i => i[key2] == true);
            if (individualResourceTrue != null) {
                this.resourcesToRender.push(<TitleResourceInfo title={value2.title} resource={value2.answer} />);
            }
        }
    }

    render() {
        return (
            <div>
                {this.resourcesToRender}
            </div>
        );
    }
}