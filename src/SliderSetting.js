import React, { Component } from 'react';
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
                <p>{this.props.settingName}: {this.props.setting}</p>
                <Slider
                    min={0}
                    max={this.props.maxSettingValue}
                    step={0.1}
                    trackStyle={{
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
                        marginTop: 1
                    }}
                    defaultValue={0}
                    onChange={this.props.handler} />
            </div>
        );
    }
}

export default SliderSetting;