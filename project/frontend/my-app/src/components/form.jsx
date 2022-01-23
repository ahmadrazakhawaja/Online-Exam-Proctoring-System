import React, { Component } from "react";
import TextBox from "./text_box";

class Form extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handlechange = this.props.onChange;
    const handleSubmit = this.props.onSubmit;

    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>{this.props.value}</h1>
        <form onSubmit={handleSubmit}>
          {this.props.elements.map((element) => (
            <TextBox
              key={element.id}
              element={element}
              onChange={handlechange}
            />
          ))}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <input
              className="btn btn-danger btn-md m-2"
              type="submit"
              value={this.props.value}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
