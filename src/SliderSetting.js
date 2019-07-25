import React, { Component } from 'react';
import ReactToolTip from 'react-tooltip';
import './SliderSetting.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

/**
 * Contains title, value and Slider
 */
class SliderSetting extends Component {

    render() {

        return (
            <div>
                <p data-tip={this.props.description} 
                    data-place="top"
                    data-effect="solid" 
                    data-type="info"
                    data-delay-show='700'
                    data-multiline="true">
                    {this.props.settingName}: {this.props.setting} {this.props.units}</p>
                    <ReactToolTip/>
                <Slider
                    marks={this.props.marks}
                    dotStyle={{
                        borderColor: '#4f97c5',
                        bottom: '-3px',
                        borderWidth: '2px'
                    }}
                    min={0}
                    max={this.props.maxSettingValue}
                    step={this.props.step}
                    trackStyle={{
                        backgroundColor: '#4f97c5',
                        height: 7
                    }}
                    handleStyle={{
                        borderColor: '#4f97c5',
                        borderWidth: 3,
                        height: 25,
                        width: 25,
                        marginLeft: -14,
                        marginTop: -8,
                    }}
                    railStyle={{
                        backgroundColor: '#84b3d1',
                        marginTop: 1
                    }}
                    defaultValue={this.props.default}
                    onChange={this.props.handler} />
            </div>
        );
    }
}

export default SliderSetting;