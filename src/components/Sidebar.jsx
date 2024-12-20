import React from "react";
import {
  Search,
  Users,
  Building2,
  Clock,
  CalendarDays,
  LogOut,
  Square,
} from "lucide-react";
import { AppRoutes } from "../utils/routes";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const Sidebar = () => {
  const logoutNow = async () => {
    await axiosClient.post("/user/logout");
    window.location.href = "/login";
  };

  return (
    <nav id="sidebar" className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="" />
      </div>

      <div className="search">
        <input type="text" placeholder="Search" />
      </div>

      {AppRoutes?.map((routeGroup) => {
        if (routeGroup?.hidden) return <></>;

        return (
          <div className="menu-section">
            <h3>{routeGroup?.title}</h3>
            {routeGroup?.children?.map((route) => {
              let Icon = route.icon;
              return (
                <Link to={route?.path} className="menu-item">
                  {Icon && <Icon />}
                  <span>{route?.label}</span>
                </Link>
              );
            })}
          </div>
        );
      })}

      <div className="menu-section">
        <h3>Others</h3>
        <a onClick={() => logoutNow()} className="menu-item">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          <span>Log out</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
