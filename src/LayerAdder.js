import React, { Component } from 'react';
import './LayerAdder.css';
import {FaPlus} from 'react-icons/fa'


class LayerAdder extends Component {
    //This components should be enclosed in a SmallContainer
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <div className='layer-adder'>
                <span className="align-middle">+</span>
            </div>
        );
    }
}

export default LayerAdder;