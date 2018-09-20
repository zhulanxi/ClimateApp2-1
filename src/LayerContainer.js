import React, { Component } from 'react';
import './LayerContainer.css';
import SmallContainer from './SmallContainer';
import LayerAdder from './LayerAdder';

/**
 * Contains the boxes for each layer and the logic to render them
 */
class LayerContainer extends Component {
    render() {


        //This is the list of layer boxes
        var layerBoxes = (
            this.props.layers.map((_layer, index) => {
                const childrenWithProps = React.cloneElement(this.props.children, { layer: _layer }); //Used to add props
                return (
                    <React.Fragment key={index}>
                        <SmallContainer>
                            {childrenWithProps}
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
                    <LayerAdder addNewDefaultLayer={this.props.addNewDefaultLayer} />
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