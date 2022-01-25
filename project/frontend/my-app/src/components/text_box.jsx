import React from "react";

export default function TextBox(props) {
  const getinput = () => {
    const { id, text, type, placeholder, value } = props.element;
    const onChange = props.onChange;
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
            onChange={(event) => onChange(props.element, event)}
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
          onChange={(event) => onChange(props.element, event)}
          aria-describedby={id}
          placeholder={placeholder}
        />
      </React.Fragment>
    );
  };

  return (
    <div style={{ marginTop: "20px" }} className="form-group">
      {getinput()}
    </div>
  );
}
