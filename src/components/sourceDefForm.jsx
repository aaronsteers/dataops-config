import React, { Component } from "react";
import ReactDOM from "react-dom";

import TextInput from "./textInput";
import jsyaml from "js-yaml";
import "bootstrap/dist/css/bootstrap.css";

import "prismjs";
// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/themes/prism-tomorrow.css";
import "../prism.css";
import "prismjs/components/prism-yaml";
import Editor from "react-simple-code-editor";
import download from "downloadjs";

var Prism = require("prismjs");
console.log(Prism.languages.yaml);

class SourceDefinitionForm extends Component {
  constructor(props) {
    super(props);
    const defaultData = {
      Source_Type: {
        id: "Source_Type",
        value: "Event History Fact",
        options: ["Event History Fact", "Aggregate Fact"]
      },
      Source_Path: { id: "Source_Path", value: "/data/my-path/*.csv" },
      Description: { id: "Description", value: "(Enter a short description)" }
    };
    this.state = {
      data: defaultData,
      yaml: this.getYaml(defaultData)
    };
    this.handleChange = this.handleChange.bind(this);
    this.getYaml = this.getYaml.bind(this);
    this.getFieldArray = this.getFieldArray.bind(this);
  }

  getFieldArray() {
    return Object.keys(this.state.data).map(key => this.state.data[key]);
  }

  getYaml(data) {
    var yamlString = "";
    for (var fieldName in data) {
      yamlString += fieldName + ": " + data[fieldName].value + "\n";
    }
    //   jsyaml.safeDump(defaultData)
    return yamlString;
  }

  handleYamlUpdate(newText) {
    let newValues;
    try {
      newValues = jsyaml.load(newText);
    } catch (YAMLException) {
      console.log("Failed to parse YAML");
    }
    const newData = Object.assign({}, this.state.data);
    var changed = 0;
    for (var fieldName in newValues) {
      if (fieldName in newData) {
        if (newData[fieldName].value !== newValues[fieldName].value) {
          newData[fieldName].value = newValues[fieldName];
          changed++;
        }
      } else {
        console.log(
          "Blocked manual YAML edit which would result in a new key '" +
            fieldName +
            "'"
        );
      }
    }
    if (changed) {
      this.setState({ data: newData, yaml: this.getYaml(newData) });
    }
  }

  handleChange(id, event) {
    console.log(id + " changed");
    const newData = Object.assign({}, this.state.data);
    newData[id].value = event.target.value;
    this.setState({ data: newData, yaml: this.getYaml(newData) });
    // const index = this.state.data.indexOf(event.target.id);
    // const newData = [...this.state.data];
    // newData[index] = event.target.value;
    // console.log("handleChange Called", this.state.data[index], newData[index]);
    // this.state.previewer.update();
  }
  //   handleChange(id) {
  //     console.log("handleChange Called", id);
  //     const index = this.state.data.indexOf(id);
  //     const newData = [...this.state.data];
  //     newData[index] = document.getElementById(id).value;
  //     this.setState({ data: newData });
  //     // this.state.previewer.update();
  //   }

  render() {
    return (
      <React.Fragment>
        <table>
          <tbody>
            {this.getFieldArray().map(field => (
              <TextInput
                key={field.id}
                id={field.id}
                field={field}
                onChange={this.handleChange}
              />
            ))}
          </tbody>
        </table>
        <p />
        <p />
        <p>YAML Preview:</p>
        {/* <code className="language-yaml" style={{ whiteSpace: "pre" }}>
          {this.state.yaml}
        </code> */}
        <div
          className="language-yaml"
          //   style={{ background: "#272822" }}
          // className="language-yaml"
        >
          <Editor
            className="language-yaml"
            value={this.state.yaml}
            onValueChange={e => this.handleYamlUpdate(e)}
            highlight={code =>
              Prism.highlight(code, Prism.languages.yaml, "yaml")
            }
            padding={10}
            tabSize={4}
            insertSpaces={true}
            textareaId={"codeblock"}
            style={{
              className: "language-yaml",
              fontSize: 12
            }}
          />
          <button
            className="btn-primary btn-lg m-3"
            style={{ width: "90%", fontSize: 12 }}
            onClick={() =>
              download(this.state.yaml, "config.yml", "text/plain")
            }
          >
            Download YAML...
          </button>
        </div>{" "}
      </React.Fragment>
    );
  }
}

export default SourceDefinitionForm;
