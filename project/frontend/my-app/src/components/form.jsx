import React from "react";
import TextBox from "./text_box";
import { useForm } from "react-hook-form";

export default function Form(props) {
  let fileObj = [];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(props.default_values ? props.default_values : {});
  // const handlechange = props.onChange;
  const onSubmit = props.onSubmit;

  const onFileUpload = (event) => {
    fileObj.push(event.target.files);
  };

  if (!props.default_values) {
    return (
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          overflowY: "auto",
          marginBottom: "100px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{props.value}</h1>
        <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
          {props.elements.map((element) => (
            <TextBox
              key={element.id}
              register={register}
              errors={errors}
              element={element}
              // onChange={handlechange}
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
              value={props.value}
            />
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div
        style={{
          overflowY: "auto",
          marginBottom: "100px",
        }}
      >
        <h1>Settings</h1>
        <hr style={{ width: "100%" }}></hr>
        <form
          style={{ width: "50%" }}
          onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
        >
          {props.elements.map((element) => (
            <TextBox
              key={element.id}
              register={register}
              errors={errors}
              element={element}
              // onChange={handlechange}
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
              value={props.value}
            />
          </div>
        </form>
      </div>
    );
  }
}
