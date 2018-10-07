import React, { Component } from 'react';
import './AtmLayer.css';
// import { FaUnlockAlt, FaLock, FaUnlock, FaTimes } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';


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
                        <button type="button" onClick={this.handleRemoveLayer} className="layer-button">
                            <FaTimes size={14} />
                        </button>
                    </span>
                </div>
                <div className="core-line">
                    {/* <span>Longwave Emissivity : {this.state.alpha.toFixed(2)}<InputRange maxValue={1} minValue={0} value={this.state.alpha} onChange={value => this.setState({alpha: value})} step={0.01}/></span> */}
                    <p>Longwave Emissivity: {this.state.alpha.toFixed(2)}</p>
                    <div className="push-above"><Slider
                        min={0}
                        max={1}
                        step={0.1}
                        trackStyle={{
                            // backgroundColor: '#4f97c5',
                            backgroundColor: '#4f97c5',
                            height: 7
                        }}
                        handleStyle={{
                            borderColor: '#4f97c5',
                            height: 17,
                            width: 17
                        }}
                        railStyle={{
                            backgroundColor: '#84b3d1',
                            // backgroundColor: '#dae6f2',
                            marginTop: 1
                        }}
                        defaultValue={0}
                        onChange={value => this.setState({alpha: value})} /></div>
                </div>
            </div>
        );
    }
}

export default AtmLayer;