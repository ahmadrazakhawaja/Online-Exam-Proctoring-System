import React, { Component } from "react";

class TextBox extends Component {
  constructor(props) {
    super(props);
  }

  getinput() {
    const { id, text, type, placeholder, value } = this.props.element;
    const onChange = this.props.onChange;
    if (type === "file") {
      return (
        <React.Fragment>
          <div>
            <label htmlFor={id}>{text}</label>
          </div>
          <input
            type={type}
            className="form-control-file btn btn-primary btn-sm mb-2"
            id={id}
            value={value}
            onChange={(event) => onChange(this.props.element, event)}
            aria-describedby={id}
            placeholder={placeholder}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <label htmlFor={id}>{text}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={(event) => onChange(this.props.element, event)}
          aria-describedby={id}
          placeholder={placeholder}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }} className="form-group">
        {this.getinput()}
      </div>
    );
  }
}

export default TextBox;
