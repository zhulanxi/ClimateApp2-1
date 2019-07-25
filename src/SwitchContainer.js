import React, { Component } from 'react';
import Switch from "react-switch";

class VersionSwitch extends Component {
    render() {
      return (
        <label htmlFor="icon-switch">
            <Switch
                checked={this.props.checked}
                onChange={this.props.handleChange}
                onColor={"#F5A623"}
                offColor={"#F5A623"}
                onHandleColor={"#000"}
                offHandleColor={"#000"}
                handleDiameter={17}
                height={23}
                width={45}
                activeBoxShadow={'0 0 2px 2px #3bf'}
                uncheckedIcon={false}
                checkedIcon={false}
            className="react-switch"
            id="icon-switch"
            />
        </label>
        
      );
    }
  }
export default VersionSwitch;  