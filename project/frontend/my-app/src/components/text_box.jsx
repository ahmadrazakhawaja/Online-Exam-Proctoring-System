import React, { useState, useEffect } from "react";
import { appendErrors } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function TextBox(props) {
  const getinput = () => {
    const { id, text, type, placeholder } = props.element;
    // const onChange = props.onChange;
    const register = props.register;
    console.log(props.errors);
    if (type === "file") {
      return (
        <React.Fragment>
          {props.element.description && <div>{props.element.description}</div>}
          <div className="row g-0">
            <div className="col-12">
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
                // onChange={(e) => props.submitx(e)}
                {...register(props.element.text, {
                  ...props.element.verification,
                  onChange: (e) => props.submitx(e, props.element.text),
                  validate: (value) => {
                    console.log(value[0].size);
                    if (value[0].size > 2000000) {
                      return "File size should be less than 2MB.";
                    }
                    if (
                      value[0].type === "image/jpeg" ||
                      value[0].type === "image/png"
                    ) {
                    } else {
                      return "File is not of image file jpeg or png.";
                    }
                  },
                })}
              />

              {props.errors[text] && props.errors[text].message}
            </div>
            </div>
            <div className="row g-0">
            <div className="col-12">
              <div>
                <label htmlFor={id}>{props.element.text2}</label>
              </div>
              <input
                type={type}
                className="form-control-file btn btn-primary btn-sm mb-2"
                id={props.element.id2}
                // onChange={props.uploadfile()}
                // value={value}
                // onChange={(event) => onChange(props.element, event)}
                aria-describedby={props.element.id2}
                placeholder={placeholder}
                accept="image/*"
                // onChange={(e) => props.submitx(e)}
                {...register(props.element.text2, {
                  ...props.element.verification,
                  onChange: (e) => props.submitx(e, props.element.text2),
                  validate: (value) => {
                    console.log(value[0].size);
                    if (value[0].size > 2000000) {
                      return "File size should be less than 2MB.";
                    }
                    if (
                      value[0].type === "image/jpeg" ||
                      value[0].type === "image/png"
                    ) {
                    } else {
                      return "File is not of image file jpeg or png.";
                    }
                  },
                })}
              />

              {props.errors[props.element.text2] &&
                props.errors[props.element.text2].message}
            </div>
            </div>
          <div className="row g-0">
            <div className="col-12">
          <div>
            <label htmlFor={id}>{props.element.text3}</label>
          </div>
          <input
            type={type}
            className="form-control-file btn btn-primary btn-sm mb-2"
            id={props.element.id3}
            // onChange={props.uploadfile()}
            // value={value}
            // onChange={(event) => onChange(props.element, event)}
            aria-describedby={props.element.id3}
            placeholder={placeholder}
            accept="image/*"
            // onChange={(e) => props.submitx(e)}
            {...register(props.element.text3, {
              ...props.element.verification,
              onChange: (e) => props.submitx(e, props.element.text3),
              validate: (value) => {
                console.log(value[0].size);
                if (value[0].size > 2000000) {
                  return "File size should be less than 2MB.";
                }
                if (
                  value[0].type === "image/jpeg" ||
                  value[0].type === "image/png"
                ) {
                } else {
                  return "File is not of image file jpeg or png.";
                }
              },
            })}
          />

          {props.errors[props.element.text3] &&
            props.errors[props.element.text3].message}
            
             </div>
             </div>
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
        <div className="row g-0">
          <div className="col" style={{marginRight: '5px'}}>
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
          <div className="col" style={{marginLeft: '5px'}}>
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
          {props.element.link && (
            <Link to="/change-password">Forgot Password</Link>
          )}

          {/* {(props.checkPassword) => (props.checkPassword === props.repassword ? '')} */}
          {props.errors[text] && props.errors[text].message}
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
          disabled={props.element.disabled ? true : false}
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
