import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <button className="primary-button" {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
