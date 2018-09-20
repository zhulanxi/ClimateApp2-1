import React, { Component } from 'react';
import './AtmLayer.css';
// import { FaUnlockAlt, FaLock, FaUnlock, FaTimes } from 'react-icons/fa'
import { FaUnlock, FaTimes } from 'react-icons/fa'

class AtmLayer extends Component {
    //This components should be enclosed in a SmallContainer
    constructor(props) {
        super(props);

        this.handleRemoveLayer = this.handleRemoveLayer.bind(this);
    }


    handleRemoveLayer(){
        this.props.removeLayer(this.props.layer);
    }


    render() {
        return (
            <div className="atm-layer">
                {/* <div className="header-line d-flex justify-content-center align-items-center"> */}
                <div className="header-line">
                        <span className="layer-name"><b>{this.props.layer.name}</b></span>
                        <span className="layer-tools">
                            <button type="button"  className="layer-button">
                                <FaUnlock size={14} />
                            </button>
                            &nbsp;
                        <button type="button" onClick={this.handleRemoveLayer} className="layer-button">
                                <FaTimes size={14} />
                            </button>
                        </span>
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