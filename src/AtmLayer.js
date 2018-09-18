import React, { Component } from 'react';
import './AtmLayer.css';

class AtmLayer extends Component {
    //This components should be enclosed in a SmallContainer
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <div className="atm-layer">
                <div className="header-line">
                    Layer1
                </div>
                <div className="core-line">
                    alpha
                </div>
                <div className="core-line">
                    beta
                </div>
                <div className="core-line">
                    gamma
                </div>
            </div>
        );
    }
}

export default AtmLayer;