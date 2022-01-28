import React from "react";
import { appendErrors } from "react-hook-form";

export default function TextBox(props) {
  const getinput = () => {
    const { id, text, type, placeholder } = props.element;
    // const onChange = props.onChange;
    const register = props.register;
    console.log(props.errors);
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
            // value={value}
            // onChange={(event) => onChange(props.element, event)}
            aria-describedby={id}
            placeholder={placeholder}
            // {...register(text, props.element.verification)}
          />
          {props.element.description}
          {/* {props.errors?.text === "Required" && `${text} is required`} */}
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
          // value={value}
          // onChange={(event) => onChange(props.element, event)}
          aria-describedby={id}
          placeholder={placeholder}
          {...register(text, props.element.verification)}
        />
        {props.errors[text] && props.errors[text].message}
        {props.element.description}
      </React.Fragment>
    );
  };

  return (
    <div style={{ marginTop: "20px" }} className="form-group">
      {getinput()}
    </div>
  );
}
