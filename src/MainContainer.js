import React, { Component } from 'react';
import './MainContainer.css';
import SmallContainer from './SmallContainer';
import AtmLayer from './AtmLayer';
import LayerAdder from './LayerAdder';

class MainContainer extends Component {
    constructor(props) {
        super(props);


    }
    render() {

        //This is the list of layer boxes
        var layerContainers = (
            this.props.layers.map(function (layer) {
                return (
                    <React.Fragment>
                        <SmallContainer>
                            <AtmLayer />
                        </SmallContainer>
                        <div className='container-spacer'></div>
                    </React.Fragment>
                )
            })
        )

        //This is the plus box that should only appear if we have less than 3 layers
        var layerAdder = Object.keys(this.props.layers).length >= 3 ? '' : (
            <React.Fragment>
                <SmallContainer>
                    <LayerAdder />
                </SmallContainer>
                <div className='container-spacer'></div>
            </React.Fragment>
        )

        return (
            <div className='main-container' >
                <div className='container-spacer'></div>
                {layerContainers}
                {layerAdder}
            </div>
        );
    }
}

export default MainContainer;