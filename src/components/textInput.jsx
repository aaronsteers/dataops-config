import React, { Component } from "react";

class TextInput extends Component {
  render() {
    let uiControl;
    if (this.props.field.options) {
      uiControl = (
        <select
          id={this.props.id}
          value={this.props.field.value}
          style={{ width: "100%" }}
          onChange={e => this.props.onChange(this.props.id, e)}
        >
          {this.props.field.options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    } else {
      uiControl = (
        <input
          type="text"
          id={this.props.id}
          key={this.props.id}
          value={this.props.field.value}
          onChange={e => this.props.onChange(this.props.id, e)}
        />
      );
    }
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.field.id}: </td>
          <td>{uiControl}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default TextInput;
