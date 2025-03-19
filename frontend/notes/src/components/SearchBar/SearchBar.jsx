import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md dark:bg-black">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-[11px] outline-none dark:placeholder-primary dark:bg-black dark:text-primary dark:placeholder-opacity-60 placeholder:font-dosis"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-xl dark:bg-black dark:text-primary cursor-pointer mr-3 hover:text-black"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="dark:bg-black cursor-pointer dark:text-primary hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
