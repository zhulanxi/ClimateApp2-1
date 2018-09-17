import React, { Component } from 'react';
import './AtmLayer.css';

class AtmLayer extends Component{
    //This components should be enclosed in a SmallContainer
    constructor(props){
        super(props);


    }
    render(){
        return(
            <div className="atm-layer">
                This would be a layer
            </div>
        );
    }
}

export default AtmLayer;