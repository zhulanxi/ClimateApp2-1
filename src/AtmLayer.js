import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './AtmLayer.css';
// import { FaUnlockAlt, FaLock, FaUnlock, FaTimes } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';


class AtmLayer extends Component {
    //The box containing sliders for individual atmospheric layer.
    //This component should be enclosed in a SmallContainer
    constructor(props) {
        super(props);

        this.handleRemoveLayer = this.handleRemoveLayer.bind(this);
        this.handleChangeAlpha = this.handleChangeAlpha.bind(this);
        this.handleChangeOpa = this.handleChangeOpa.bind(this);
        this.handleChangeSca = this.handleChangeSca.bind(this);
    }

    handleChangeAlpha(newValue) {
        this.props.alphaHandler(this.props.layer.layerNumber, newValue);
    }
    
    handleChangeOpa(newValue) {
        this.props.opaHandler(this.props.layer.layerNumber, newValue);
    }

    handleChangeSca(newValue) {
        this.props.scaHandler(this.props.layer.layerNumber, newValue);
    }

    handleRemoveLayer() {
        this.props.removeLayer(this.props.layer);
    }


    render() {
        // console.log("Rendered layer " + this.props.layer.layerNumber + "With default value" + this.props.layer.alpha);
        return (
            <div className="atm-layer">
                <div className="header-line">
                    <span className="layer-name"><b>Layer {this.props.layer.layerNumber}</b></span>
                    <span className="layer-tools">
                        <button type="button" onClick={this.handleRemoveLayer} className="layer-button">
                            <FaTimes size={14} />
                        </button>
                    </span>
                </div>
                <div className="core-line">
                    <p data-tip="Fraction of shortwave radiation that is being absorbed or reflected
                     by the atmospheric layers.<br/> A value of 1 means that all shortwave radiation interacts with this atmospheric layer." 
                    data-place="top"
                    data-effect="solid" 
                    data-type="info"
                    data-delay-show='700'
                    data-multiline="true">
                        Shortwave Opacity: {this.props.layer.opa.toFixed(2)}</p>
                        <ReactTooltip/>
                    <div className="push-above"><Slider
                    marks={this.props.marks}
                    dotStyle={{
                        borderColor: '#4f97c5',
                        bottom: '-3px',
                        borderWidth: '2px'
                    }}
                        min={0.01}
                        max={1}
                        step={0.01}
                        trackStyle={{
                            backgroundColor: '#4f97c5',
                            height: 7
                        }}
                        handleStyle={{
                            borderColor: '#4f97c5',
                            borderWidth: 3,
                            height: 20,
                            width: 20,
                            marginLeft: -10,
                            marginTop: -7,
                        }}
                        railStyle={{
                            backgroundColor: '#84b3d1',
                            marginTop: 1
                        }}
                        defaultValue={(Math.log10(this.props.layer.opa)+2)/2}
                        value={(Math.log10(this.props.layer.opa)+2)/2}
                        onChange={(value) => this.handleChangeOpa(value)} /></div>
                    <p></p>
                    <p data-tip="The fraction of total interacting shortwave radiation that is scattered.<br/> A value of 1 means that all interacting shortwave radiation are scattered." 
                    data-place="top"
                    data-effect="solid" 
                    data-type="info"
                    data-delay-show='700'
                    data-multiline="true">
                        Single Scattering Albedo: {this.props.layer.sca.toFixed(2)}</p>
                    
                    <div className="push-above"><Slider
                    marks={this.props.scaMarks}
                    dotStyle={{
                        borderColor: '#4f97c5',
                        bottom: '-3px',
                        borderWidth: '2px'
                    }}
                        min={0}
                        max={1}
                        step={0.01}
                        trackStyle={{
                            backgroundColor: '#4f97c5',
                            height: 7
                        }}
                        handleStyle={{
                            borderColor: '#4f97c5',
                            borderWidth: 3,
                            height: 20,
                            width: 20,
                            marginLeft: -10,
                            marginTop: -7,
                        }}
                        railStyle={{
                            backgroundColor: '#84b3d1',
                            marginTop: 1
                        }}
                        defaultValue={this.props.layer.sca}
                        value={this.props.layer.sca}
                        onChange={(value) => this.handleChangeSca(value)} /></div>
                        <p></p>
                    <p data-tip="The fraction of incident thermal radiation absorbed by the atmosphere, also called longwave emissivity.<br/>
                    The fraction of scattered thermal radiation is fixed to 0." 
                    data-place="top"
                    data-effect="solid" 
                    data-type="info"
                    data-delay-show='700'
                    data-multiline="true">
                        Longwave Opacity: {this.props.layer.alpha.toFixed(2)}</p>
                    
                    <div className="push-above"><Slider
                    marks={this.props.marks}
                    dotStyle={{
                        borderColor: '#4f97c5',
                        bottom: '-3px',
                        borderWidth: '2px'
                    }}
                        min={0.01}
                        max={1}
                        step={0.01}
                        trackStyle={{
                            backgroundColor: '#4f97c5',
                            height: 7
                        }}
                        handleStyle={{
                            borderColor: '#4f97c5',
                            borderWidth: 3,
                            height: 20,
                            width: 20,
                            marginLeft: -10,
                            marginTop: -7,
                        }}
                        railStyle={{
                            backgroundColor: '#84b3d1',
                            marginTop: 1
                        }}
                        defaultValue={(Math.log10(this.props.layer.alpha)+2)/2}
                        value={(Math.log10(this.props.layer.alpha)+2)/2}
                        onChange={(value) => this.handleChangeAlpha(value)} /></div>
                        <p></p>
                </div>
            </div>
        );
    }
}

export default AtmLayer;