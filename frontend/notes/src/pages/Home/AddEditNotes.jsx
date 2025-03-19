import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // 添加新笔记
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully! 🎊");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  // 编辑笔记
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully! 🎉");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title.");
      return;
    }
    if (!content) {
      setError("Please enter the content.");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-0">
      <div className="relative bg-white dark:bg-darkBackground px-6 py-4 rounded-lg shadow-lg w-[500px] max-w-full overflow-hidden">
        {/* 关闭按钮 */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center absolute top-1 right-1 hover:bg-primary dark:hover:bg-yellow-400"
          onClick={onClose}
        >
          <MdClose
            className="text-xl text-darkBackground dark:text-primary dark:hover:text-darkBackground"
            style={{ transform: "scale(1.2)" }}
          />
        </button>

        <h4 className="text-3xl font-bold mb-5 text-black font-bigShoulders dark:text-primary">
          {type === "edit" ? "Edit Note" : "Add Note"}
        </h4>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-bold font-dosis text-darkBackground dark:text-primary">
            TITLE
          </label>
          <input
            type="text"
            placeholder="Name your note..."
            className={`
              text-xl bg-transparent outline-none border-b border-gray-300 
              focus:border-yellow-500 pb-1 dark:focus:border-yellow-400
              w-full dark:text-primary dark:placeholder-primary dark:border-primary dark:placeholder-opacity-60 font-dosis
            `}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4 font-dosis ">
          <label className="text-sm font-bold text-darkBackground  dark:text-primary">
            CONTENT
          </label>
          <textarea
            placeholder="Write your thoughts here... ✨"
            rows={6}
            className={`
              bg-transparent outline-none border-b border-gray-300 text-xl
             focus:border-yellow-500 dark:focus:border-yellow-400 pb-1
              resize-none w-full dark:text-primary dark:placeholder-primary dark:border-primary dark:placeholder-opacity-60
            `}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        {/* 标签输入框 */}
        <div className="mb-4">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            TAGS
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* 错误提示 */}
        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

        {/* 提交按钮 */}
        <button
          className={`
            text-xl font-bold btn-primary w-full py-3 mt-3
            dark:text-primary  dark:border-yellow-400
            hover:bg-yellow-400 dark:hover:text-black hover:text-darkBackground
          `}
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
