import React, { Component } from 'react';
import './AtmLayer.css';
// import { FaUnlockAlt, FaLock, FaUnlock, FaTimes } from 'react-icons/fa'
import { FaUnlock, FaTimes } from 'react-icons/fa';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


class AtmLayer extends Component {
    //This components should be enclosed in a SmallContainer
    constructor(props) {
        super(props);

        this.state = {
            alpha: props.layer.alpha,
            beta: props.layer.beta,
            gamma: props.layer.gamma
        }

        this.handleRemoveLayer = this.handleRemoveLayer.bind(this);
    }


    handleRemoveLayer() {
        this.props.removeLayer(this.props.layer);
    }

    //TODO update local layer to global
    render() {
        return (
            <div className="atm-layer">
                {/* <div className="header-line d-flex justify-content-center align-items-center"> */}
                <div className="header-line">
                    <span className="layer-name"><b>{this.props.layer.name}</b></span>
                    <span className="layer-tools">
                        <button type="button" className="layer-button">
                            <FaUnlock size={14} />
                        </button>
                        &nbsp;
                        <button type="button" onClick={this.handleRemoveLayer} className="layer-button">
                            <FaTimes size={14} />
                        </button>
                    </span>
                </div>
                <div className="core-line">
                    <span>alpha <InputRange maxValue={1} minValue={0} value={this.state.alpha} onChange={value => this.setState({alpha: value})} step={0.05}/></span>
                </div>
                <div className="core-line">
                    <span>beta <InputRange maxValue={1} minValue={0} value={this.state.beta} onChange={value => this.setState({beta: value})} step={0.05}/></span>
                </div>
                <div className="core-line">
                    <span>gamma <InputRange maxValue={1} minValue={0} value={this.state.gamma} onChange={value => this.setState({gamma: value})} step={0.05}/></span>
                </div>
            </div>
        );
    }
}

export default AtmLayer;