import React, { Component } from 'react';
import './SingleSettingController.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

/**
 * Fromat a container for a single setting of the main app 
*/
class SingleSettingController extends Component{

    render() {


        return (
            <div className="setting-container">
                {this.props.children}
            </div>
        );
    }
}

export default SingleSettingController;