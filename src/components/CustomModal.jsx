import React from "react";

const CustomModal = ({ open, onClose, children }) => {
  if (!open) return;

  return (
    <div className="custom-modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default CustomModal;
