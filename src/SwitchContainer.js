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
                handleDiameter={21}
                activeBoxShadow={'0 0 2px 2px #3bf'}
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: "white",
                            paddingRight: 2
                        }}
                    >
                        Pro
                    </div>
                }
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: "white",
                            paddingLeft: 2
                        }}
                    >
                        Ped
                    </div>
                }
            className="react-switch"
            id="icon-switch"
            />
        </label>
        
      );
    }
  }
export default VersionSwitch;  