import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import logo from './sun.svg';
import './App.css';
import LayerContainer from './LayerContainer';
import AtmLayer from './AtmLayer';
import SingleSettingController from './SingleSettingController';
import SliderSetting from './SliderSetting';
import SimulationCanvas from './SimulationCanvas';


/**
 * We will need multiple components. All data should be accessed through the parents, passed through props. To add data to a state of a component,
 * store it in this.state in the constructor of that component.
 * setState will re-render the virtual DOM, then diff with older DOM and re-render the diff on actual DOM
 */


class App extends Component {
  constructor(props) {
    super(props);

    var layer1 = {
      layerNumber: 1,
      alpha: 0.7,
      beta: 0.3,
      gamma: 0.0,
      locked: false
    }

    // var layer2 = {
    //   layerNumber: 2,
    //   alpha: 0.2,
    //   beta: 0.5,
    //   gamma: 0.0,
    //   locked: true
    // }

    this.state = {
      stellarRadiation: 3,
      planetaryAlbedo: 0.2,
      nameCount: 3,
      layers: [layer1]
    };

    this.addNewDefaultLayer = this.addNewDefaultLayer.bind(this);
    this.addNewLayer = this.addNewLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
    this.changeAlbedo = this.changeAlbedo.bind(this);
    this.changeStellarRadiation = this.changeStellarRadiation.bind(this);
  }

  changeAlbedo(newValue) {
    this.setState({
      planetaryAlbedo: newValue
    })
  }

  changeStellarRadiation(newValue) {
    this.setState({
      stellarRadiation: newValue
    })
  }

  addNewDefaultLayer() {
    var newLayer = {
      layerNumber: this.state.layers.length + 1,
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

    // this.setState(prevState => ({
    //   layers: prevState.layers.filter(layer => !Object.is(layer, delLayer))
    // }));

    this.setState(prevState => {
      console.log("Deleting layer " + delLayer.layerNumber + "em: " + delLayer.alpha)
      var newLayers = prevState.layers.filter(layer => !Object.is(layer, delLayer));
      for (let layer of newLayers) {
        if (layer.layerNumber > delLayer.layerNumber) {
          layer.layerNumber--;
        }
      }
      return { layers: newLayers };
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Climate App 2.0</h1>
        </header>
        <main role="main">
          <div className="main-frame">

            <div className="main-container">
              <div className="setting-container">
                <SingleSettingController>
                  <SliderSetting settingName="Stellar Radiation" maxSettingValue={10} setting={this.state.stellarRadiation} handler={this.changeStellarRadiation} />
                </SingleSettingController>
                <SingleSettingController>
                  <SliderSetting settingName="Planetary Albedo" maxSettingValue={1} setting={this.state.planetaryAlbedo} handler={this.changeAlbedo} />
                </SingleSettingController>

                <SingleSettingController position="last">
                  <LayerContainer settingName="Atmospheric Layers" layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer}>
                    <AtmLayer removeLayer={this.removeLayer} />
                  </LayerContainer>
                </SingleSettingController>
              </div>
              <div className="simulation-container" >
                Simulation
              <SimulationCanvas />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
