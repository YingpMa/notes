import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border dark:border-primary rounded p-4 bg-white dark:bg-darkBackground hover:shadow-xl transition-all ease-in-out dark:text-slate-50 font-dosis">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-medium font-dosis dark:text-primary">
            {title}
          </h6>
          <span className="text-xs text-slate-500 dark:text-[#999]">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-[#999]"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
        {content?.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {tags.map((item) => `#${item}`)}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
