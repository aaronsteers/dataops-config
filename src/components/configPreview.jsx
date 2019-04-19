import React, { Component } from "react";

class ConfigPreview extends Component {
  constructor(props) {
    super(props);
    this.state = { inputs: props.inputs };
  }

  render() {
    return (
      <React.Fragment>
        <code name="preview">
          {" "}
          {this.state.inputs.map(i => "1" + i.value)}{" "}
        </code>
      </React.Fragment>
    );
  }
}

export default ConfigPreview;
