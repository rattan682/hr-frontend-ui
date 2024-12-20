import { CircleX, X } from "lucide-react";
import React from "react";

const ModalHeading = ({ children, onClose }) => {
  return (
    <div className="modal-heading">
      <h1>{children}</h1>
      <div className="icon" onClick={onClose}>
        <CircleX />
      </div>
    </div>
  );
};

export default ModalHeading;
