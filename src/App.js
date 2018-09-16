import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

/**
 * We will need multiple components. All data should be accessed through the parents, passed through props. To add data to a state of a component,
 * store it in this.state in the constructor of that component.
 * setState will re-render the virtual DOM, then diff with older DOM and re-render the diff on actual DOM
 */


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 0.0
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      temp: e.target.value
    })
  }

  render() {
    var s1 = {
      background:"green"
    }
    var s2 = {
      background:"blue"
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Climate App 2.0</h1>
        </header>
        <main role="main" class="container">
          <div class="row">
            <div class="col-sm-6" style={s1}>
            test
            </div>
            <div class="col-sm-6" style={s2}>
            test
            </div>
          </div>

          {/* <p> Temp is: {this.state.temp}</p>
          <p>Set the temp here: <input type="text" value={this.state.temp} onChange={this.handleChange}></input></p>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        </main>

      </div>
    );
  }
}

export default App;
