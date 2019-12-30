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


  /**
   * 
   * @param {*} num: the index of the number to be changed
   * return a lambda function that will update the number
   */
  numberHandler(num) {
    return event => {
      let numList = { ...this.state.numbers };
      numList[num] = event.target.value;
      this.setState({ numbers: numList });
    };
  }


  /**
   * a lambda function that toggle the answer
   */
  showAnsHandler = () => {
    var bool = this.state.showAns;
    this.setState({ showAns: !bool });
  };
  
  /**
   * a lambda function that will randomly choose four numbers ranging from 1 to 13 
   */
  randomNumberGenerator = () =>{
    let numList = {...this.state.numbers}
    for (var key in numList){
      numList[key] = Math.round(Math.random() * 12) + 1;
    }
    this.setState({numbers:numList});
  }


  render() {
    let action = "Show Answer";
    if(this.state.showAns){
      action = "Conceal Answer";
    }

    return (
      <div className="App">
        <h1 style = {this.buttonStyle}>Game 24</h1>
        <NumberInput
          numbers={this.state.numbers}
          changed={index => this.numberHandler(index)}
        />
        <Button variant = "success" onClick = {this.randomNumberGenerator}>Random</Button>
        <Button variant="primary" onClick={this.showAnsHandler} style={this.buttonStyle}>{action}</Button>
        <Result num={this.state.numbers} showState={this.state.showAns} />
      </div>
    );
  }
}

export default App;
