import { useState } from "react";
import { Modal } from "react-bootstrap";
import React from "react";

const Popup = ({ show, onHide }) => {
  const [showmodal, setShow] = useState(false);

  const toggleModal = () => {
    setShow(false);
  };

  return (
    <Modal show={showmodal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>More Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table"></table>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
