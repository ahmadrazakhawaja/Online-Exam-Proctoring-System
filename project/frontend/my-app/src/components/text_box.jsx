import React, { useState, useEffect } from "react";
import { appendErrors } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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
            {props.element.institutes &&
              props.element.institutes.map((institute) => (
                <option key={institute.__v} value={institute.instituteName}>
                  {institute.instituteName}
                </option>
              ))}
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
    if (text === "Retype Password") {
      return (
        <React.Fragment>
          <label htmlFor={id}>
            {text}
            {props.element.verification.required ? "*" : null}
          </label>
          <div className="input-group">
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              type={!props.passwordEye ? type : "text"}
              className="form-control"
              id={id}
              // value={value}
              // onChange={(event) => onChange(props.element, event)}
              aria-describedby={id}
              placeholder={placeholder}
              {...register(text, {
                ...props.element.verification,
                validate: (value) =>
                  value === props.password || "The passwords do not match",
              })}
            />
            <span
              style={{
                position: "absolute",
                left: "95%",
                marginRight: "10%",
                zIndex: "100",
              }}
              className="mt-1"
            >
              {props.passwordEye === false ? (
                <AiFillEyeInvisible
                  onClick={() => props.setpasswordEye(!props.passwordEye)}
                />
              ) : (
                <AiFillEye
                  onClick={() => props.setpasswordEye(!props.passwordEye)}
                />
              )}
            </span>
          </div>
          {/* {(props.checkPassword) => (props.checkPassword === props.repassword ? '')} */}
          {props.errors[text] && props.errors[text].message}
          {props.element.description}
        </React.Fragment>
      );
    }
    if (text === "Password") {
      return (
        <React.Fragment>
          <label htmlFor={id}>
            {text}
            {props.element.verification.required ? "*" : null}
          </label>
          <div className="input-group">
            <input
              type={!props.passwordEye ? type : "text"}
              className="form-control"
              id={id}
              // value={value}
              // onChange={(event) => onChange(props.element, event)}
              aria-describedby={id}
              placeholder={placeholder}
              {...register(text, props.element.verification)}
            />
            <span
              style={{
                position: "absolute",
                left: "95%",
                marginRight: "10%",
                zIndex: "100",
              }}
              className="mt-1"
            >
              {props.passwordEye === false ? (
                <AiFillEyeInvisible
                  onClick={() => props.setpasswordEye(!props.passwordEye)}
                />
              ) : (
                <AiFillEye
                  onClick={() => props.setpasswordEye(!props.passwordEye)}
                />
              )}
            </span>
          </div>
          {/* {(props.checkPassword) => (props.checkPassword === props.repassword ? '')} */}
          {props.errors[text] && props.errors[text].message}
          {props.element.description}
        </React.Fragment>
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
