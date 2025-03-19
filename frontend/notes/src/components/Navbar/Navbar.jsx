import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { PiPawPrintBold } from "react-icons/pi"; // 使用 Phosphor Icons 的 Paw Print

const Navbar = ({
  userInfo,
  onSearchNote,
  handleClearSearch,
  theme,
  toggleTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white dark:bg-darkBackground flex items-center justify-between px-6 py-2 drop-shadow">
      <div className="flex items-center gap-1">
        <PiPawPrintBold className="text-3xl text-black dark:text-primary mr-5" />
        <h2 className="text-4xl font-medium font-bigShoulders dark:text-darkTitleText text-black py-2 ">
          Notes
        </h2>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className={`
          flex items-center justify-center
          w-10 h-10 rounded-full
          transition-colors duration-300
          mr-5
          ${
            theme === "light"
              ? "bg-white hover:bg-darkTitleText text-yellow-500"
              : "bg-darkBackground hover:bg-black text-darkTitleText"
          }
        `}
          title={theme === "light" ? "切换到暗色模式" : "切换到浅色模式"}
        >
          {theme === "light" ? (
            <MdOutlineLightMode className="text-xl" />
          ) : (
            <MdOutlineDarkMode className="text-xl" />
          )}
        </button>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
