// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  // 从 localStorage 获取初始值
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 当 theme 改变时，更新 localStorage，并在 <html> 上加/去掉 .dark
  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      // 在 <html> 标签上添加 class="dark"
      document.documentElement.classList.add("dark");
    } else {
      // 移除 class="dark"
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // 切换主题
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // 不需要再用 <div className={theme === "dark" ? "dark" : ""}>
    // 因为我们已经在 <html> 上切换 .dark
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<Home theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/login"
          element={<Login theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/signup"
          element={<SignUp theme={theme} toggleTheme={toggleTheme} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
