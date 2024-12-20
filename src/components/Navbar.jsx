import React from "react";
import { Bell, Mail, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getLabelFromPath } from "../utils/routes";

const Navbar = () => {
  let location = useLocation();

  return (
    <nav id="navbar">
      <div className="nav-container">
        <a href="/" className="nav-title">
          {/* <Users size={24} /> */}
          <span>{getLabelFromPath(location?.pathname)}</span>
        </a>

        {/* <ul className="nav-links">
          <li>
            <a href="/dashboard" className="nav-link active">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/jobs" className="nav-link">
              Jobs
            </a>
          </li>
          <li>
            <a href="/applications" className="nav-link">
              Applications
            </a>
          </li>
          <li>
            <a href="/messages" className="nav-link">
              Messages
            </a>
          </li>
        </ul> */}

        <div className="nav-actions">
          <Mail className="nav-icon" size={35} />
          <Bell className="nav-icon" size={35} />
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
