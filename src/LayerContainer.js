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
            this.props.layers.slice(0).reverse().map((_layer, index) => {
                // this.props.layers.map((_layer, index) => {
                    const childrenWithProps = React.cloneElement(this.props.children, { layer: _layer, alphaHandler: this.props.alphaHandler, opaHandler: this.props.opaHandler, scaHandler: this.props.scaHandler }); //Used to add props
                return (
                    <React.Fragment key={index}>
                        <SmallContainer>
                            {childrenWithProps}
                        </SmallContainer>
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
                {/* <div className='container-spacer'></div> */}
            </React.Fragment>
        )

        return (
            // <div className="box">
            <React.Fragment>
                <p className='box-content'>{this.props.settingName}</p>
                <div className='layer-container box box-filler' >
                    {/* <div className='container-spacer'></div> */}
                    {layerAdder}
                    {layerBoxes}
                </div>
            </React.Fragment>
            );
    }
}

export default LayerContainer;