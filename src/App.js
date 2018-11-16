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


const radiationMarks = {
  0: 0,
  20: 0.1,
  40: <strong>1</strong>,
  60:10,
  80:100,
  100:1000
};

const defaultMarks = {
  0:0,
  1:1
}

class App extends Component {

  constructor(props) {
    super(props);

    // Default loaded example
    var layer1 = {
      layerNumber: 1,
      alpha: 0.7,
    }

    this.state = {
      stellarRadiation: 1,
      planetaryAlbedo: 0.3,
      nameCount: 3,
      layers: [layer1]
    };

    this.addNewDefaultLayer = this.addNewDefaultLayer.bind(this);
    this.addNewLayer = this.addNewLayer.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
    this.changeAlbedo = this.changeAlbedo.bind(this);
    this.changeStellarRadiation = this.changeStellarRadiation.bind(this);
    this.changeAlpha = this.changeAlpha.bind(this);
  }

  changeAlpha(layerNumber, alphaValue) {
    // 1. Make a shallow copy of the layers
    let newLayers = [...this.state.layers];
    // 2. Make a shallow copy of the item you want to mutate
    let layer = { ...newLayers[layerNumber - 1] };
    // 3. Replace the property you're intested in
    layer.alpha = alphaValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    newLayers[layerNumber - 1] = layer;
    // 5. Set the state to our new copy
    this.setState({ layers: newLayers });

  }

  changeAlbedo(newValue) {
    this.setState({
      planetaryAlbedo: newValue
    })
  }

  /**
   * Given a value between 0 and 100, return a value on the scale between 10^-2 to 10^3
   */
  getLogScaleValue(x){
    var ans = Math.pow(10,(x-40)/20)
    if(ans < 1){
      ans = ans.toFixed(2)
    }else if(ans <10){
      ans = ans.toFixed(1)
    }else{
      ans = ans.toFixed(0)
    }
    return ans;
  }

  reverseLogScale(x){
    return 20*Math.log(x)+40
  }

  changeStellarRadiation(newValue) {
    console.log("changeStellarRad called with: "+newValue);
    console.log("Returning value: "+this.getLogScaleValue(newValue))
    this.setState({
      stellarRadiation: this.getLogScaleValue(newValue)
    })
  }

  addNewDefaultLayer() {
    var newLayer = {
      layerNumber: this.state.layers.length + 1,
      alpha: 0.5,
    }
    this.addNewLayer(newLayer);
  }

  addNewLayer(newLayer) {
    if (Object.keys(this.state.layers).length >= 3) {
      return false;
    }

    this.setState((prevState) => ({
      layers: [...prevState.layers, newLayer]
    }))
  }

  removeLayer(delLayer) {

    // TODO, maybe it could help to have some validation

    this.setState(prevState => {
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
    console.log("Rendered app.js");
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
                  <SliderSetting settingName="Stellar Radiation" maxSettingValue={100} step={0.1} default={40} setting={this.state.stellarRadiation} handler={this.changeStellarRadiation} marks={radiationMarks}/>
                </SingleSettingController>
                <SingleSettingController>
                  <SliderSetting settingName="Planetary Albedo" maxSettingValue={0.99} step={0.01} default={this.state.planetaryAlbedo} setting={this.state.planetaryAlbedo} handler={this.changeAlbedo} marks={defaultMarks}/>
                </SingleSettingController>

                <SingleSettingController position="last">
                  <LayerContainer settingName="Atmospheric Layers" layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer} alphaHandler={this.changeAlpha}>
                    <AtmLayer removeLayer={this.removeLayer} />
                  </LayerContainer>
                </SingleSettingController>
              </div>
              <div className="simulation-container" >
                Simulation
              <SimulationCanvas planetaryAlbedo={this.state.planetaryAlbedo} stellarRadiation={this.state.stellarRadiation} layers={this.state.layers} />
              </div>
            </div>
          </div>
        </main>
        <footer className="App-footer">
          <p>Anthony Courchesne | Nicolas Cowan | McGill University 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
