import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import logo from './sun.svg';
import './App.css';
import LayerContainer from './LayerContainer';
import AtmLayer from './AtmLayer';


/**
 * We will need multiple components. All data should be accessed through the parents, passed through props. To add data to a state of a component,
 * store it in this.state in the constructor of that component.
 * setState will re-render the virtual DOM, then diff with older DOM and re-render the diff on actual DOM
 */


class App extends Component {
  constructor(props) {
    super(props);

    var layer1 = {
      name: "layer1",
      alpha: 0.7,
      beta: 0.3,
      gamma: 0.0,
      locked: false
    }

    var layer2 = {
      name: "layer2",
      alpha: 0.2,
      beta: 0.5,
      gamma: 0.0,
      locked: true
    }

    this.state = {
      nameCount: 3,
      layers: [layer1, layer2]
    };

    this.addNewDefaultLayer = this.addNewDefaultLayer.bind(this);
    this.addNewLayer = this.addNewLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
  }

  addNewDefaultLayer() {
    var newLayer = {
      name: "layer" + this.state.nameCount,
      alpha: 0.5,
      beta: 0.5,
      gamma: 0.5,
      locked: true
    }
    this.addNewLayer(newLayer);
  }

  addNewLayer(newLayer) {
    if (Object.keys(this.state.layers).length >= 3) {
      return false;
    }

    this.setState((prevState) => ({
      nameCount: prevState.nameCount + 1,
      layers: [...prevState.layers, newLayer]
    }))
  }

  removeLayer(delLayer) {

    // TODO, maybe it could help to have some validation

    this.setState(prevState => ({
      layers: prevState.layers.filter(layer => !Object.is(layer, delLayer))
    }));
  }

  render() {
    var s2 = {
      background: "white"
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Climate App 2.0</h1>
        </header>
        <main role="main" className="container">
          <div className="row main-container">
            <div className="col-sm-6">
              <LayerContainer layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer}>
                <AtmLayer removeLayer={this.removeLayer} />
              </LayerContainer>
            </div>
            <div className="col-sm-6" style={s2}>
              Simulation
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
