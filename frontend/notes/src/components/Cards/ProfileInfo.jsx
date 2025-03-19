import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 ">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-bold bg-[#FCFCFC] dark:bg-black dark:text-darkTitleText font-dosis">
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-semibold font-dosis  dark:text-darkTitleText">
          {userInfo.fullName}
        </p>
        <button
          className="text-sm font-dosis text-slate-700 underline dark:text-darkTitleText"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
