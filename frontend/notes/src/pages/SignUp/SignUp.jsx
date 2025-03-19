// src/pages/SignUp/SignUp.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = ({ theme, toggleTheme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email,
        password,
      });

      if (response.data?.error) {
        setError(response.data.message);
        return;
      }
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    // Parent container: flex-col + min-h-screen
    // Light mode: bg-gray-100, Dark mode: bg-slate-900
    <div className="flex flex-col min-h-screen bg-[#FCFCFC] dark:bg-slate-950 ">
      {/* Navbar on top, width auto (flex container handles it) */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Body (flex-1 fills remaining space after Navbar) */}
      <div className="flex-1 flex items-center justify-center  ">
        <div className="w-96 border rounded bg-white dark:bg-black dark:text-slate-100 px-7 py-10 shadow-lg dark:border-primary">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl font-bold mb-7 font-bigShoulders dark:text-darkTitleText">
              Sign Up
            </h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box font-dosis dark:text-primary dark:placeholder-primary dark:border-primary dark:placeholder-opacity-60"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box font-dosis dark:text-primary dark:placeholder-primary dark:border-primary dark:placeholder-opacity-60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-xs pb-1 font-dosis">{error}</p>
            )}

            <button
              className="text-xl font-bold btn-primary font-bigShoulders dark:text-primary border-[1px] dark:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-black hover:bg-yellow-500"
              type="submit"
            >
              Create Account
            </button>
            <p className="text-sm text-center mt-4 dark:text-primary font-dosis">
              Already have an account?{"  "}
              <Link
                to="/login"
                className="font-bold font-dosis dark:text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
