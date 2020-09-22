import React from React;
import * as resources from "./DecisionTreeConstants";

resources.legacyDecisionTree.forEach(element => console.log(element));

function createData(field, value) {
    return {field, value};
}

export default class ResourcePage extends Component {
    constructor(props) {
        super(props);
        this.decisionTreeRows = [];
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {decisionTreeType} = this.props.match.params;
        axios.get("http://localhost:5000/" + decisionTreeType + "/" + id)
        .then(response => {
            this.decisionTreeRows = [
                createData("", "")
            ]
        })
    }
}