import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_API } from "../../constants";

const LoginPage = () => {
  const [eyes, setEyes] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post(`${BACKEND_API}/user/login`, data, {
      withCredentials: true,
    });
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
      return navigate("/");
    }
    toast.error(response.data.message);
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="auth-form-wrapper">
          <img src="/public/logo.png" alt="Logo" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {" "}
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <h1>Welcome to Dashboard</h1>
              <div>
                <label style={{ fontSize: "20px" }} htmlFor="email">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    className="input-field"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: "20px" }} htmlFor="password">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    placeholder="Enter your password here"
                    className="input-field"
                    type={eyes ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {eyes ? (
                    <EyeOff onClick={() => setEyes(false)} className="icon" />
                  ) : (
                    <Eye onClick={() => setEyes(true)} className="icon" />
                  )}
                </div>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
                <h5 className="link">Forgot Password?</h5>
              </div>

              <button className="button" type="submit">
                Login
              </button>
              <h6 className="link">
                Don't have an account?
                <Link to={"/register"} style={{ color: "#442487" }}>
                  {" "}
                  Register
                </Link>
              </h6>
            </form>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <img
            height={"100%"}
            width={"100%"}
            src="/Onboarding.png"
            alt="Onboarding"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
