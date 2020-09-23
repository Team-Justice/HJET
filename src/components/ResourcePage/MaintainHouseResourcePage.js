import React from 'react';
import * as resources from "./DecisionTreeConstants";
import axios from 'axios';
import {TitleResourceInfo} from './TitleResourceInfo';

function createData(field, value) {
    return {field: value};
}

export default class MaintainHouseResourcePage extends React.Component {
    constructor(props) {
        super(props);
        this.decisionTreeRows = [];
        this.decisionTreeResources = resources.maintainDecisionTree;
        this.resourcesToRender = [];
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