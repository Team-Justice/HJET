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
        this.decisionTreeResources = resources.legacyDecisionTree;
        this.resourcesToRender = [];
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        console.log ("ID IS " + id);
        // get case info for that decision tree
        axios.get("http://localhost:5000/legacy-wealth-building/" + id)
        .then(response => {
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
        });
        console.log(this.decisionTreeRows);
        //create data will look like "schema" : "true"
        //{"_id":"5f68b5a59229462710460108","caseID":"5f510c51b75bd424ac82c721","needHomeRenovation":true,
        //"wantToAttendWealthSeminar":true,"haveReverseMortgage":true,"needMortgageOrDeedTransfer":true,
        //"wantFirstTimeBuyersCourse":true,"needHealthyHomeInspection":true,"needEnergyEfficiencyInspection":true,
        //"planToAbandonHome":true,"needFinancialAssistance":true,"needEmploymentAssistance":true,"knowAboutHUDAssistance":true,
        //"haveOwnershipNeeds":true,"haveFamilySuccessivePlan":true,"needFinancialCounseling":true,"__v":0},

        //plan
        //for each item in legacy decision tree,
        //if  query.item == true
        //post title and answer
        ///how to do this 
            /// worse case : create boolean state values and conditionally render each
            //  best case: create another component, then create those components while iterating and add them to list
            // then render that list!
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
        console.log(this.resourcesToRender);
    }

    render() {
        return (
            <div>
                {this.resourcesToRender}
            </div>
        );
    }
}