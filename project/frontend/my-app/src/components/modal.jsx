


export default function Modal(props) {

  //   setting_div = document.getElementById("setting");
  //   setting_div.style.opacity = "0.2";
  return (
    <div
      className="modal fade show"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      model="true"
      role="dialog"
      style={{ display: "block", opacity: "1 !important" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Image Upload
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                props.image.element.target.value = null;
                // props.reset({ pic: "" });
                props.setimage(false);
                return false;
              }}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img
              style={{
                objectFit: "contain",
                width: "100%",
              }}
              src={props.image.image}
            ></img>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                props.image.element.target.value = null;
                // if (pic === "Picture 1") {
                // }
                // i;

                props.setimage(false);
                return false;
              }}
            >
              Cancel
            </button>
            <button
              // onClick={() => props.navigate("/login")}
              type="button"
              className="btn btn-primary"
              onClick={() => props.setimage(false)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
