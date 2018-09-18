import React, { Component } from 'react';
import './SmallContainer.css';

/**
 * Small boxes that is able to accept input for this specific layer
 */
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