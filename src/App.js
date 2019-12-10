import React, { Component } from "react";
import "./App.css";
import NumberInput from "./components/numberInput";
import Result from "./components/output";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
//============================================================

class App extends Component {
  state = { numbers: { 1: 0, 2: 0, 3: 0, 4: 0 }, showAns: false };
  buttonStyle = {
    padding: "5px",
    margin: "15px"
  }

  numberHandler(num) {
    return event => {
      let numList = { ...this.state.numbers };
      numList[num] = event.target.value;
      this.setState({ numbers: numList });
    };
  }
  showAnsHandler = () => {
    var bool = this.state.showAns;
    this.setState({ showAns: !bool });
  };

  render() {
    return (
      <div className="App">
        <h1 style = {this.buttonStyle}>Game 24</h1>
        <NumberInput
          numbers={this.state.numbers}
          changed={index => this.numberHandler(index)}
        />
        <Button variant="primary" onClick={this.showAnsHandler} style={this.buttonStyle}>Toggle Answer</Button>
        {/* <button onClick={this.showAnsHandler}>Toggle Answer</button> */}
        <Result num={this.state.numbers} showState={this.state.showAns} />
      </div>
    );
  }
}

export default App;
