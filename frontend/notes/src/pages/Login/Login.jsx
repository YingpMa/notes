// src/pages/Login/Login.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { BASE_URL } from "../../utils/constants";

const Login = ({ theme, toggleTheme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
      console.log("BASE_URL:", BASE_URL);
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data && response.data.accessToken) {
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
    // 与 SignUp 一样：flex-col + min-h-screen + bg-gray-100 dark:bg-slate-950
    <div className="flex flex-col min-h-screen bg-[#FCFCFC] dark:bg-slate-950">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 主体：占据剩余空间，居中 */}
      <div className="flex-1 flex items-center justify-center">
        {/* 表单卡片：与 SignUp 一样的暗色风格 */}
        <div className="w-96 border rounded bg-white dark:bg-black dark:text-slate-100 px-7 py-10 shadow-lg dark:border-primary">
          <form onSubmit={handleLogin}>
            {/* 标题样式：与 SignUp 相同 */}
            <h4 className="text-3xl font-bold mb-7 font-bigShoulders dark:text-darkTitleText">
              Login
            </h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box font-dosis 
                         dark:text-primary dark:placeholder-primary 
                         dark:border-primary dark:placeholder-opacity-60"
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

            {/* 按钮样式：与 SignUp 相同 */}
            <button
              className="text-xl font-bold btn-primary font-bigShoulders 
                         dark:text-primary border-[1px] dark:border-yellow-400 
                         dark:hover:bg-yellow-400 dark:hover:text-black hover:bg-yellow-500"
              type="submit"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 dark:text-primary font-dosis">
              Not registered yet?{"  "}
              <Link
                to="/signUp"
                className="font-bold font-dosis dark:text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
