import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
// import logo from './logo.svg';

import logo from './sun.svg';
import './App.css';
import LayerContainer from './LayerContainer';
import LayerContainerPed from './LayerContainerPed';
import AtmLayer from './AtmLayer';
import AtmLayerFr from './AtmLayerFr';
import AtmLayerPed from './AtmLayerPed';
import SingleSettingController from './SingleSettingController';
import SliderSetting from './SliderSetting';
import SliderSettingPed from './SliderSettingPed';
import SimulationCanvas from './SimulationCanvas';
import SimulationCanvasPed from './SimulationCanvasPed';

import VersionSwitch from './SwitchContainer';
import LanguageSwitch from './LanguageSwitch';

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

const radiationMarksFr = {
  0: '0,01',
  25: '0,1',
  50: <strong>1</strong>,
  75:10,
  100:100
};

const opacityMarks = {
  0.01:0.01,
  0.5:0.1,
  1:1
}

const opacityMarksFr = {
  0.01:'0,01',
  0.5:'0,1',
  1:1
}

const scaMarks = {
  0:0,
  0.5:0.5,
  1:1
}

const scaMarksFr = {
  0:0,
  0.5:'0,5',
  1:1
}

const defaultMarks = {
  0:0,
  0.2:0.2,
  0.4:0.4,
  0.6:0.6,
  0.8:0.8,
  1:1
}

const defaultMarksFr = {
  0:0,
  0.2:'0,2',
  0.4:'0,4',
  0.6:'0,6',
  0.8:'0,8',
  1:1
}

const percentageMarks = {
  0:"0%",
  20:"20%",
  40:"40%",
  60:"60%",
  80:"80%",
  99:"100%"
}

class App extends Component {

  constructor(props) {
    super(props);

    // Default loaded examples
    var layer1 = {
      layerNumber: 1,
      alpha: 0.66,//longwave opacity
      opa: 0.32,//shortwave opacity
      sca: 1.00//single scattering albedo
    };

    var layer2 = {
      layerNumber: 2,
      alpha: 0.30,//longwave opacity
      opa: 0.08,//shortwave opacity
      sca: 1.00//single scattering albedo
    };

    var layer3 = {
      layerNumber: 3,
      alpha: 0.02,//longwave opacity
      opa: 0.0175,//shortwave opacity
      sca: 0.00//single scattering albedo
    };


    var layerPed = {
      layerNumber: 1,
      alpha: 0.78
    }

    /*
    Independ props for two versions so that changes made in
    one version do not carry on to the other.
    */
    this.state = {
      stellarRadiation: 1,
      stellarRadiationPed: 1,
      planetaryAlbedo: 0.18,
      planetaryAlbedoPed: 0.3,
      nameCount: 3,
      nameCountPed: 1,
      layers: [layer1, layer2, layer3],
      layerPed: [layerPed],
      checked: false, //switch state "true" = beginner (pedagogical) version
      english: true //language either English (true) or French (false)
      //If more languages are added in the future, maybe use
      //language: 'en'; language: 'fr'; instead
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
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeVersion(checked) {
    this.setState({ checked: checked === true ? true : false });
    //sets the state of the version toggle
  }

  changeLanguage(checked) {
    this.setState({ english: checked === true ? true : false });
    //sets the state of the language toggle
  }

  outputState(){
      return this.state.checked;
  }

  outputLa(){
    return this.state.english;
  }

  changeAlpha(layerNumber, alphaValue) {
    // 1. Make a shallow copy of the layers
    let newLayers = [...this.state.layers];
    // 2. Make a shallow copy of the item you want to mutate
    let layer = { ...newLayers[layerNumber - 1] };
    // 3. Replace the property you're intested in
    layer.alpha = Math.pow(10,alphaValue*2-2);
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    newLayers[layerNumber - 1] = layer;
    // 5. Set the state to our new copy
    this.setState({ layers: newLayers });

  }

  changeAlphaPed(layerNumber,alphaValue) {
    
    let newLayer = [...this.state.layerPed];
    let layer = {...newLayer[layerNumber - 1]};
    layer.alpha = alphaValue;
    newLayer[layerNumber - 1] = layer;
    this.setState({ layerPed: newLayer });

  }


  changeOpa(layerNumber, opaValue) {
    let newLayers = [...this.state.layers];
    let layer = { ...newLayers[layerNumber - 1] };
    layer.opa = Math.pow(10,opaValue*2-2); //reverse of (Math.log10(x)+2)/2
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
      planetaryAlbedoPed : newValue/100
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
      alpha: 0.1,
      opa: 0.1,
      sca:0.5
    }
    this.addNewLayer(newLayer);
  }

  addNewDefaultLayerPed() {
    var newLayer = {
      layerNumber: 1,
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
    if (Object.keys(this.state.layerPed).length >= 1) {
      return false;
    }

    this.setState((prevState) => ({
      layerPed: [...prevState.layerPed, newLayer]
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
      var newLayer = prevState.layerPed.filter(layer => !Object.is(layer, delLayer));
      for (let layer of newLayer) {
        if (layer.layerNumber > delLayer.layerNumber) {
          layer.layerNumber--;
        }
      }
      return { layerPed: newLayer };
    })
  }

//added conditional rendering for switch
  render() { 
    if (this.state.english){
      return (
        <div className="App">
            <span className="topcorner">
            <font color="#797878" font-weight="bold">French&nbsp;</font>
            <LanguageSwitch checked = {this.state.english} handleChange = {this.changeLanguage}/> 
            <font color="white" font-weight="bold">&nbsp;English&nbsp;</font>
            </span>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Climate App 3.1</h1>

            {this.state.checked === true ?
            <span className="App-intro">
            <font color="#797878" font-weight="bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beginner&nbsp;</font>
            <VersionSwitch checked = {this.state.checked} handleChange = {this.changeVersion}/> 
            &nbsp;Advanced&nbsp;&nbsp;
            </span>
            :
            <span className="App-intro">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beginner&nbsp;
            <VersionSwitch checked = {this.state.checked} handleChange = {this.changeVersion}/> 
            <font color="#797878" font-weight="bold" >&nbsp;Advanced&nbsp;&nbsp;</font>
            </span>} 
          </header>
        {this.state.checked === true ?            
          
          <main role="main">
            <div className="main-frame">
              <div className="main-container">
                <div className="setting-container">
                  <SingleSettingController>
                    <SliderSetting language={this.state.english} description="The amount of starlight that reaches the top of the atmosphere."
                    settingName="Stellar Radiation" maxSettingValue={100} step={0.1} 
                    default={(Math.log10(this.state.stellarRadiation)+2)*100/4} 
                    setting={this.state.stellarRadiation} handler={this.changeStellarRadiation} 
                    marks={radiationMarks} units={"S₀"}/>
                  </SingleSettingController>
                  
  
                  <SingleSettingController position="last">
                    <LayerContainer settingName="Atmospheric Layers" layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer} alphaHandler={this.changeAlpha} opaHandler={this.changeOpa} scaHandler={this.changeSca} >
                      <AtmLayer layerCount={this.state.layers.length} marks={opacityMarks} scaMarks = {scaMarks} removeLayer={this.removeLayer}  />
                    </LayerContainer>
                  </SingleSettingController>
                  <SingleSettingController>
                    <SliderSetting language={this.state.english} description="Fraction of starlight reflected by the planetary surface." settingName="Surface Albedo" maxSettingValue={0.99} step={0.01} default={this.state.planetaryAlbedo} setting={this.state.planetaryAlbedo} handler={this.changeAlbedo} marks={defaultMarks}/>
                  </SingleSettingController>
                </div>
                <div className="simulation-container" >
                  Trenberth Diagram
                <SimulationCanvas language={this.state.english} planetaryAlbedo={this.state.planetaryAlbedo} stellarRadiation={this.state.stellarRadiation} layers={this.state.layers} />
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
                    <SliderSettingPed language={this.state.english} description="The amount of starlight that reaches the planet." settingName="Energy from star" maxSettingValue={100} step={0.1} default={(Math.log10(this.state.stellarRadiationPed)+2)*100/4} setting={this.state.stellarRadiationPed} handler={this.changeStellarRadiationPed} marks={radiationMarks} units={"x what Earth receives from the Sun"}/>
                  </SingleSettingController>
                  <SingleSettingController>
                    <LayerContainerPed settingName="Atmosphere" layer={this.state.layerPed} addNewDefaultLayer={this.addNewDefaultLayerPed} alphaHandler={this.changeAlphaPed}>
                      <AtmLayerPed removeLayer={this.removeLayerPed} language={this.state.english} />
                    </LayerContainerPed>
                  </SingleSettingController>
                  <SingleSettingController position = 'last'>
                    <SliderSettingPed description="Fraction of starlight reflected by the planet." settingName="Planetary Reflectivity" maxSettingValue={99} step={1} default={(this.state.planetaryAlbedoPed*100).toFixed(0)} setting={(this.state.planetaryAlbedoPed*100).toFixed(0)} units={"%"} handler={this.changeAlbedoPed} marks={percentageMarks}/>
                  </SingleSettingController>
  
                  
                </div>
                <div className="simulation-container" >
                  Simulation
                <SimulationCanvasPed planetaryAlbedo={this.state.planetaryAlbedoPed} stellarRadiation={this.state.stellarRadiationPed} layer={this.state.layerPed} language={this.state.english}/>
                </div>
              </div>
            </div>
          </main>}
          <footer className="App-footer">
            <p>L. X. Zhu | A. Courchesne | J. C. Schwartz | N. Cowan | McGill University 2021 | <a href="https://climateapp.ca/public/Instructions.pdf">How does this work ?</a></p>
          </footer>
        </div>
      );
    }

    else{
    return (
      <div className="App">
        <span className="topcorner">
            <font color="white" font-weight="bold">Français&nbsp;</font>
            <LanguageSwitch checked = {this.state.english} handleChange = {this.changeLanguage}/> 
            <font color="#797878" font-weight="bold">&nbsp;Anglais&nbsp;</font>
        </span>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Appli Climat 3.1</h1>

          {this.state.checked === true ?
          <span className="App-intro">
           <font color="#797878" font-weight="bold">&nbsp;Débutant&nbsp;</font>
          <VersionSwitch checked = {this.state.checked} handleChange = {this.changeVersion}/> 
          &nbsp;Avancé&nbsp;&nbsp;
          </span>
          :
          <span className="App-intro">
          &nbsp;Débutant&nbsp;
          <VersionSwitch checked = {this.state.checked} handleChange = {this.changeVersion}/> 
          <font color="#797878" font-weight="bold" >&nbsp;Avancé&nbsp;&nbsp;</font>
          </span>} 
        </header>
      {this.state.checked === true ?            
        
        <main role="main">
          <div className="main-frame">
            <div className="main-container">
              <div className="setting-container">
                <SingleSettingController>
                  <SliderSetting language={this.state.english} description="Quantité de la lumière de l'étoile qui atteint le sommet de l'atmosphère."
                  settingName="Radiation stellaire" maxSettingValue={100} step={0.1} 
                  default={(Math.log10(this.state.stellarRadiation)+2)*100/4} 
                  setting={this.state.stellarRadiation} handler={this.changeStellarRadiation} 
                  marks={radiationMarksFr} units={"x ce que la Terre reçoit du Soleil"}/>
                </SingleSettingController>
                

                <SingleSettingController position="last">
                  <LayerContainer settingName="Couches atmosphériques" layers={this.state.layers} addNewDefaultLayer={this.addNewDefaultLayer} alphaHandler={this.changeAlpha} opaHandler={this.changeOpa} scaHandler={this.changeSca} >
                    <AtmLayerFr layerCount={this.state.layers.length} marks={opacityMarksFr} scaMarks = {scaMarksFr} removeLayer={this.removeLayer}  />
                  </LayerContainer>
                </SingleSettingController>
                <SingleSettingController>
                  <SliderSetting language={this.state.english} description="Fraction de la lumière de l'étoile qui est réfléchie par la surface planétaire." settingName="Albédo de la surface" maxSettingValue={0.99} step={0.01} default={this.state.planetaryAlbedo} setting={this.state.planetaryAlbedo} handler={this.changeAlbedo} marks={defaultMarksFr}/>
                </SingleSettingController>
              </div>
              <div className="simulation-container" >
                Diagramme de Trenberth
              <SimulationCanvas language={this.state.english} planetaryAlbedo={this.state.planetaryAlbedo} stellarRadiation={this.state.stellarRadiation} layers={this.state.layers} />
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
                  <SliderSettingPed language={this.state.english} description="Quantité de la lumière de l'étoile qui atteint la planète." settingName="Énergie de l'étoile" maxSettingValue={100} step={0.1} default={((Math.log10(this.state.stellarRadiationPed)+2)*100/4)} setting={this.state.stellarRadiationPed} handler={this.changeStellarRadiationPed} marks={radiationMarksFr} units={"x ce que la Terre reçoit du Soleil"}/>
                </SingleSettingController>
                <SingleSettingController>
                  <LayerContainerPed settingName="Atmosphère" layer={this.state.layerPed} addNewDefaultLayer={this.addNewDefaultLayerPed} alphaHandler={this.changeAlphaPed}>
                    <AtmLayerPed removeLayer={this.removeLayerPed} language={this.state.english} />
                  </LayerContainerPed>
                </SingleSettingController>
                <SingleSettingController position = 'last'>
                  <SliderSettingPed description="Fraction de lumière de l'étoile qui est réfléchie par la planète." settingName="Réflectivité de la planète" maxSettingValue={99} step={1} default={(this.state.planetaryAlbedoPed*100).toFixed(0)} setting={(this.state.planetaryAlbedoPed*100).toFixed(0)} units={"%"} handler={this.changeAlbedoPed} marks={percentageMarks}/>
                </SingleSettingController>

                
              </div>
              <div className="simulation-container" >
                Simulation
              <SimulationCanvasPed planetaryAlbedo={this.state.planetaryAlbedoPed} stellarRadiation={this.state.stellarRadiationPed} layer={this.state.layerPed} language={this.state.english} />
              </div>
            </div>
          </div>
        </main>}
        <footer className="App-footer">
          <p>L. X. Zhu | A. Courchesne | J. C. Schwartz | N. Cowan | Université McGill 2021 | <a href="https://climateapp.ca/public/Instructions.pdf">Comment ça marche ?</a></p>
        </footer>
      </div>
    );
      }
  }
}

export default App;