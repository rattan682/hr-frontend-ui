import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BACKEND_API } from "../../constants";
const RegisterPage = () => {
  const [eyes, setEyes] = useState(false);
  const navigate = useNavigate();
  // Initialize the form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Form submit handler
  const onSubmit = async (data) => {
    const response = await axios.post(`${BACKEND_API}/user/register`, data);

    if (response.data.success) {
      toast.success(response.data.message);
      return navigate("/login");
    }
    toast.error(response.data.message);
    // Handle form submission logic here
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
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <h1>Create an Account</h1>

              {/* Name Input */}
              <div>
                <label style={{ fontSize: "20px" }} htmlFor="name">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <input
                    id="name"
                    placeholder="Enter your full name"
                    type="text"
                    className="input-field"
                    {...register("fullname", {
                      required: "Name is required",
                    })}
                  />
                </div>
                {errors.fullname && (
                  <p style={{ color: "red" }}>{errors.fullname.message}</p>
                )}
              </div>

              {/* Email Input */}
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

              {/* Password Input */}
              <div>
                <label style={{ fontSize: "20px" }} htmlFor="password">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    placeholder="Enter your password"
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
              </div>

              {/* Confirm Password Input */}
              <div>
                <label style={{ fontSize: "20px" }} htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="input-field"
                    type={eyes ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords don't match",
                    })}
                  />
                  {eyes ? (
                    <EyeOff onClick={() => setEyes(false)} className="icon" />
                  ) : (
                    <Eye onClick={() => setEyes(true)} className="icon" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button className="button" type="submit">
                Register
              </button>

              <h6 className="link">
                Already have an account?
                <Link to={"/login"} style={{ color: "#442487" }}>
                  {" "}
                  Login
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

export default RegisterPage;
