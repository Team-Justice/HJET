import React from 'react'
import './DTCategories.css'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

class DTCategories extends React.Component {
    constructor(props) {
        super(props);
        this.caseID = "";
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.caseID = id;
    }

    render() {
        return (
            <div className="dtcategories-container">
                <div className="content-container">
                    <h1>What type of decision tree would you like to fill out?</h1>
                    <div className="dt-buttons">
                        <Link to={'/decisionTreeCategories/legacy/' + this.caseID}><Button variant="outline-secondary">Legacy Wealth Building Scheme</Button></Link>
                        <Link to={'/decisionTreeCategories/maintain/' + this.caseID}><Button variant="outline-secondary">Maintain Current Home</Button></Link>
                        <Link to={'/decisionTreeCategories/sell/' + this.caseID}><Button variant="outline-secondary">Sell the House</Button></Link>    
                    </div>
                </div>
            </div>
        ) 
    }
}

export default DTCategories;