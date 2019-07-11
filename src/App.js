import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
// import logo from './logo.svg';

import logo from './sun.svg';
import './App.css';
import LayerContainer from './LayerContainer';
import LayerContainerPed from './LayerContainerPed';
import AtmLayer from './AtmLayer';
import AtmLayerPed from './AtmLayerPed';
import SingleSettingController from './SingleSettingController';
import SliderSetting from './SliderSetting';
import SliderSettingPed from './SliderSettingPed';
import SimulationCanvas from './SimulationCanvas';
import SimulationCanvasPed from './SimulationCanvasPed';

import VersionSwitch from './SwitchContainer';

/**
 * We will need multiple components. All data should be accessed through the parents, passed through props. To add data to a state of a component,
 * store it in this.state in the constructor of that component.
 * setState will re-render the virtual DOM, then diff with older DOM and re-render the diff on actual DOM
 */

const radiationMarks = {
  0: 0.01,
  25: 0.1,
  50: <strong>1</strong>,
  75:10,
  100:100
};

const defaultMarks = {
  0:0,
  0.2:0.2,
  0.4:0.4,
  0.6:0.6,
  0.8:0.8,
  1:1
}

class App extends Component {

  constructor(props) {
    super(props);

    // Default loaded example
    var layer1 = {
      layerNumber: 1,
      alpha: 0.7,
      opa: 0.3,
      sca: 0.3
    };

    var layerPed = {
      layerNumber: 1,
      alpha: 0.7
    }

    //Different props for different versions to avoid sharing
    this.state = {
      stellarRadiation: 1,
      stellarRadiationPed: 1,
      planetaryAlbedo: 0.3,
      planetaryAlbedoPed: 0.3,
      nameCount: 3,
      nameCountPed: 1,
      layers: [layer1],
      layersPed: [layerPed],
      checked: true
    };

    this.addNewDefaultLayer = this.addNewDefaultLayer.bind(this);
    this.addNewDefaultLayerPed = this.addNewDefaultLayerPed.bind(this);
    this.addNewLayer = this.addNewLayer.bind(this);
    this.addNewLayerPed = this.addNewLayerPed.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
    this.removeLayerPed = this.removeLayerPed.bind(this);
    this.changeAlbedo = this.changeAlbedo.bind(this);
    this.changeAlbedoPed = this.changeAlbedoPed.bind(this);
    this.changeStellarRadiation = this.changeStellarRadiation.bind(this);
    this.changeStellarRadiationPed = this.changeStellarRadiationPed.bind(this);
    this.changeAlpha = this.changeAlpha.bind(this);
    this.changeAlphaPed = this.changeAlphaPed.bind(this);
    this.changeOpa = this.changeOpa.bind(this);
    this.changeSca = this.changeSca.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
  }
  changeVersion(checked) {
    this.setState({ checked: checked === true ? true : false });
  }

  outputState(){
      return this.state.checked;
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

  changeAlphaPed(layerNumber, alphaValue) {
    
    let newLayers = [...this.state.layersPed];
    let layer = { ...newLayers[layerNumber - 1] };
    layer.alpha = alphaValue;
    newLayers[layerNumber - 1] = layer;
    this.setState({ layersPed: newLayers });

  }


//added codes
  changeOpa(layerNumber, opaValue) {
    let newLayers = [...this.state.layers];
    let layer = { ...newLayers[layerNumber - 1] };
    layer.opa = opaValue;
    newLayers[layerNumber - 1] = layer;
    this.setState({ layers: newLayers });

  }

  changeSca(layerNumber, scaValue) {
    let newLayers = [...this.state.layers];
    let layer = { ...newLayers[layerNumber - 1] };
    layer.sca = scaValue;
    newLayers[layerNumber - 1] = layer;
    this.setState({ layers: newLayers });

  }

  changeAlbedo(newValue) {
    this.setState({
      planetaryAlbedo: newValue
    })
  }

  changeAlbedoPed(newValue) {
    this.setState({
      planetaryAlbedoPed : newValue
    })
  }

  /**
   * Given a value between 0 and 100, return a value on the scale between 10^-2 to 10^3
   */
  getLogScaleValue(x){
    var ans = Math.pow(10,(x-50)/25)
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
    return 20*Math.log10(x)+40
  }

  changeStellarRadiation(newValue) {
    this.setState({
      stellarRadiation: this.getLogScaleValue(newValue)
    })
  }

  changeStellarRadiationPed(newValue){
    this.setState({
      stellarRadiationPed: this.getLogScaleValue(newValue)
    })
  }

  addNewDefaultLayer() {
    var newLayer = {
      layerNumber: this.state.layers.length + 1,
      alpha: 0.5,
      opa: 0.3,
      sca:0.3
    }
    this.addNewLayer(newLayer);
  }

  addNewDefaultLayerPed() {
    var newLayer = {
      layerNumber: this.state.layersPed.length + 1,
      alpha: 0.5
    }
    this.addNewLayerPed(newLayer);
  }

  addNewLayer(newLayer) {
    if (Object.keys(this.state.layers).length >= 3) {
      return false;
    }

    this.setState((prevState) => ({
      layers: [...prevState.layers, newLayer]
    }))
  }

  addNewLayerPed(newLayer) {
    if (Object.keys(this.state.layersPed).length >= 1) {
      return false;
    }

    this.setState((prevState) => ({
      layersPed: [...prevState.layersPed, newLayer]
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

  removeLayerPed(delLayer) {

    
    this.setState(prevState => {
      var newLayers = prevState.layersPed.filter(layer => !Object.is(layer, delLayer));
      for (let layer of newLayers) {
        if (layer.layerNumber > delLayer.layerNumber) {
          layer.layerNumber--;
        }
      }
      return { layersPed: newLayers };
    })
  }

//conditional rendering for switch
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Climate App 3.0</h1>
          <VersionSwitch checked = {this.state.checked} handleChange = {this.changeVersion}/>  
        </header>
      {this.state.checked === false ?            
        
        <main role="main">
          <div className="main-frame">

            <div className="main-container">
              <div className="setting-container">
                <SingleSettingController>
                  <SliderSetting description="The amount of radiation from the star that reaches the planet,<br/> assumed to be completely within the shortwave range."settingName="Stellar Radiation" maxSettingValue={100} step={0.1} default={(Math.log10(this.state.stellarRadiation)+2)*100/4} setting={this.state.stellarRadiation} handler={this.changeStellarRadiation} marks={radiationMarks} units={"S₀"}/>
                </SingleSettingController>
                

                <SingleSettingController position="last">
                  <LayerContainer settingName="Atmospheric Layers" layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer} alphaHandler={this.changeAlpha} opaHandler={this.changeOpa} scaHandler={this.changeSca} >
                    <AtmLayer removeLayer={this.removeLayer} />
                  </LayerContainer>
                </SingleSettingController>
                <SingleSettingController>
                  <SliderSetting description="Planetary surface reflectivity to shortwave radiation,<br/> different from effective albedo." settingName="Surface Albedo" maxSettingValue={0.99} step={0.01} default={this.state.planetaryAlbedo} setting={this.state.planetaryAlbedo} handler={this.changeAlbedo} marks={defaultMarks}/>
                </SingleSettingController>
              </div>
              <div className="simulation-container" >
                Trenberth Diagram
              <SimulationCanvas planetaryAlbedo={this.state.planetaryAlbedo} stellarRadiation={this.state.stellarRadiation} layers={this.state.layers} />
              </div>
            </div>
          </div>
        </main>
        :
        
        <main role="main">
          <div className="main-frame">

            <div className="main-container">
              <div className="setting-container">
                <SingleSettingController>
                  <SliderSettingPed description="The amount of radiation from the star that reaches the planet." settingName="Solar Radiation" maxSettingValue={100} step={0.1} default={(Math.log10(this.state.stellarRadiationPed)+2)*100/4} setting={this.state.stellarRadiationPed} handler={this.changeStellarRadiationPed} marks={radiationMarks} units={"S₀"}/>
                </SingleSettingController>
                <SingleSettingController>
                  <LayerContainerPed settingName="Atmosphere" layers={this.state.layersPed} addNewDefaultLayer={this.addNewDefaultLayerPed} alphaHandler={this.changeAlphaPed}>
                    <AtmLayerPed removeLayer={this.removeLayerPed} />
                  </LayerContainerPed>
                </SingleSettingController>
                <SingleSettingController position = 'last'>
                  <SliderSettingPed description="How reflective the planet surface is to solar radiation.<br/> A value of 1 means complete reflection." settingName="Planetary Reflectivity" maxSettingValue={0.99} step={0.01} default={this.state.planetaryAlbedoPed} setting={this.state.planetaryAlbedoPed} handler={this.changeAlbedoPed} marks={defaultMarks}/>
                </SingleSettingController>

                
              </div>
              <div className="simulation-container" >
                Simulation
              <SimulationCanvasPed planetaryAlbedo={this.state.planetaryAlbedoPed} stellarRadiation={this.state.stellarRadiationPed} layers={this.state.layersPed} />
              </div>
            </div>
          </div>
        </main>}
        <footer className="App-footer">
          <p>A. Courchesne| L. X. Zhu | N. Cowan | McGill University 2019 | <a href="https://climateapp.ca/public/Instructions.pdf">How does this work ?</a></p>
        </footer>
      </div>
    );
  }
}

export default App;