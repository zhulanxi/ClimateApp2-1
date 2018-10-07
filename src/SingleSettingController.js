import React, { Component } from 'react';
import './SingleSettingController.css';
import 'rc-slider/assets/index.css';

/**
 * Fromat a container for a single setting of the main app 
*/
class SingleSettingController extends Component{

    render() {

        var classes = this.props.position === "last" ? "setting-container box box-filler" : "setting-container box-content"; 

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

export default SingleSettingController;