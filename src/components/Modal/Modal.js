import React from "react";
import xMark from './xMark.svg'
import withdrawIcon from './withdrawIcon.svg'
import statsIcon from './statsIcon.svg'


const Modal = ({   visible, modalId, setIsVisible, children, title }) => {

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
    >
      <div className="modal-dialog tymodal">
        <div className="modal-content" style={{width: title === "withdraw" && '37%' }}>
          <div className="modal-header justify-content-between align-items-center">
           <div className="d-flex align-items-center gap-2">
            <img src={title === "stats" ? statsIcon : withdrawIcon} height={25} width={25} alt="" />
            <h6 style={{fontWeight: '500', fontSize: '20px', lineHeight: '28px', color: '#f7f7fc'}}>{title === "stats" ? "My Stats" : "Withdraw"}</h6>
           </div>
           <img src={xMark} style={{cursor: 'pointer'}}  onClick={closeModal}/>

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
