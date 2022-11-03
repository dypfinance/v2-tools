import React from "react";


const Modal = ({   visible, modalId, setIsVisible, children }) => {

  let className = "modal fade ";
  let style = {};
  if (visible === true) {
    className = "modal fade show";
    style = { display: "block", background: "rgba(0,0,0, 0.5)" };
  }

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={className}
      id={modalId}
      tabIndex="-1"
      aria-labelledby={"modalLabel" + modalId}
      aria-hidden="true"
      style={style}
      onClick={closeModal}
    >
      <div className="modal-dialog tymodal">
        <div className="modal-content">
          <div className="modal-header">
           
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>

          </div>
          <div className="modal-body">
           {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  setIsVisible: () => {},
};

export default Modal;
