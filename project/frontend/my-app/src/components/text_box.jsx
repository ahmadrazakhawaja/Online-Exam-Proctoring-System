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
            // onChange={props.uploadfile()}
            // value={value}
            // onChange={(event) => onChange(props.element, event)}
            aria-describedby={id}
            placeholder={placeholder}
            accept="image/*"
            {...register(text, props.element.verification)}
          />
          {props.element.description && <div>{props.element.description}</div>}
          {/* {props.errors?.text === "Required" && `${text} is required`} */}
        </React.Fragment>
      );
    } else if (type === "form-select") {
      return (
        <React.Fragment>
          <select
            className={type}
            aria-label="Default select example"
            {...register(text, props.element.verification)}
          >
            <option value="">
              {text}
              {props.element.verification.required ? "*" : null}
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          {props.errors[text] && props.errors[text].message}
        </React.Fragment>
      );
    }
    if (text === "First Name") {
      return (
        <div className="row">
          <div className="col">
            <label htmlFor={id}>
              {text}
              {props.element.verification.required ? "*" : null}
            </label>
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
          </div>
          <div className="col">
            <label htmlFor={props.element.id2}>
              {props.element.text2}
              {props.element.verification2.required ? "*" : null}
            </label>
            <input
              type={type}
              className="form-control"
              id={props.element.id2}
              // value={value}
              // onChange={(event) => onChange(props.element, event)}
              aria-describedby={props.element.id2}
              placeholder={props.element.placeholder2}
              {...register(props.element.text2, props.element.verification2)}
            />
            {props.errors[props.element.text2] &&
              props.errors[props.element.text2].message}
            {props.element.description2}
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <label htmlFor={id}>
          {text}
          {props.element.verification.required ? "*" : null}
        </label>
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
