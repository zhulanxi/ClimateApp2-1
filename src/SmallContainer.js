import React, { Component } from 'react';
import './SmallContainer.css';

class SmallContainer extends Component {
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <div className='small-container'>
                {this.props.children}
            </div>
        );
    }
}

export default SmallContainer;