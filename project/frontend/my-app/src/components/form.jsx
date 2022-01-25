import React from "react";
import TextBox from "./text_box";

export default function Form(props) {
  const handlechange = props.onChange;
  const handleSubmit = props.onSubmit;

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>{props.value}</h1>
      <form onSubmit={handleSubmit}>
        {props.elements.map((element) => (
          <TextBox key={element.id} element={element} onChange={handlechange} />
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
