import React, { useState } from "react";

const CustomMenu = ({ button, children, open }) => {
  return (
    <div className="custom-menu">
      <div onClick={() => setOpen(!open)} className="custom-menu-button">
        {button}
      </div>
      {open && <div className="custom-menu-items">{children}</div>}
    </div>
  );
};

export default CustomMenu;
