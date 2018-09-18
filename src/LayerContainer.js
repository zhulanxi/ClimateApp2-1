import React, { Component } from 'react';
import './LayerContainer.css';
import SmallContainer from './SmallContainer';
import AtmLayer from './AtmLayer';
import LayerAdder from './LayerAdder';

/**
 * Contains the boxes for each layer and the logic to render them
 */
class LayerContainer extends Component {
    constructor(props) {
        super(props);


    }
    render() {

        //This is the list of layer boxes
        var layerBoxes = (
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
            <div className='layer-container' >
                <div className='container-spacer'></div>
                {layerBoxes}
                {layerAdder}
            </div>
        );
    }
}

export default LayerContainer;