import React from 'react';

class TitleResourceInfo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            resource: props.resource,
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p1>{this.state.resource}</p1>
            </div>
        );
    }
}