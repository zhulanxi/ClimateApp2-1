import React, { Component } from 'react';
import './SliderSetting.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

/**
 * Contains title, value and Slider
 */
class SliderSetting extends Component{

    constructor(props) {
        super(props);

        this.state = {
            settingName : this.props.settingName,
            settingValue : 0
        }

        // this.handleAddNew = this.handleAddNew.bind(this);
    }



    render() {


        return (
            <div>
                <p>{this.state.settingName}: {this.state.settingValue}</p>
                <Slider min={0} max={10} step={0.5}X defaultValue={this.props.settingValue} />

            </div>
        );
    }
}

export default SliderSetting;