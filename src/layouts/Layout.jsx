import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axiosClient from "../utils/axiosClient";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initVerifyToken();
  }, []);

  const initVerifyToken = async () => {
    try {
      let response = await axiosClient.get("/verify");
      console.log({ response });
      if (!response?.data?.success) {
        window.location.href = "/login";
      }

      setLoading(false);
    } catch (error) {
      window.location.href = "/login";
    }
  };

  if (loading)
    return (
      <div className="loading-screen">
        <img src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif" />
      </div>
    );

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
