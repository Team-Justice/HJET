import React from 'react'
import './DTCategories.css'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

class DTCategories extends React.Component {
    render() {
        return (
            <div className="dtcategories-container">
                <div className="content-container">
                    <h1>What type of decision tree would you like to fill out?</h1>
                    <div className="dt-buttons">
                        <Link to='/decisionTreeCategories/legacy'><Button variant="outline-secondary">Legacy Wealth Building Scheme</Button></Link>
                        <Link to='/decisionTreeCategories/maintain'><Button variant="outline-secondary">Maintain Current Home</Button></Link>
                        <Link to='/decisionTreeCategories/sell'><Button variant="outline-secondary">Sell the House</Button></Link>    
                    </div>
                </div>
            </div>
        ) 
    }
}

export default DTCategories;