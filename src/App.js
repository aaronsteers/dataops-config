import React, {
  Component
} from "react";
import logo from "./logo.svg";
import "./App.css";
import SourceDefinitionForm from "./components/sourceDefForm";

class App extends Component {
  render() {
    return ( <
      div className = "App" >
      <
      header className = "App-header" >
      <
      SourceDefinitionForm / >
      <
      a className = "App-link"
      href = "https://reactjs.org"
      target = "_blank"
      rel = "noopener noreferrer" >
      <
      img src = {
        logo
      }
      className = "App-logo"
      alt = "logo"
      height = "100"
      width = "100" /
      >
      <
      /a>{" "} <
      /header>{" "} <
      /div>
    );
  }
}

export default App;