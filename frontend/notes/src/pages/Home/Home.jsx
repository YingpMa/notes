// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = ({ theme, toggleTheme }) => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // 显示 Toast 提示
  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "", type: "add" });
  };

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // 获取所有笔记
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later. ");
    }
  };

  // 删除笔记
  const deleteNote = async (noteData) => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully! 👋", "delete");
        getAllNotes();
      }
    } catch (err) {
      console.log("An unexpected error occurred. Please try again later.");
    }
  };

  // 搜索笔记
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 切换笔记是否置顶
  const updateIsPinned = async (noteData) => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.put(
        "/updated-note-pinned/" + noteId,
        { isPinned: !noteData.isPinned }
      );
      if (response.data?.note) {
        showToastMessage("Note Updated Successfully! 🎉");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    // 最外层：垂直布局 + 占满屏幕 + 浅色/暗色背景
    <div className="flex flex-col min-h-screen bg-[#FCFCFC] dark:bg-black relative">
      {/* Navbar 放在顶部 */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 主体内容：flex-1 表示填满剩余空间，container 宽度自适应 */}
      <div className="flex-1 container mx-auto bg-footer dark:bg-none">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? "/notebook.png" : "/notes.png"}
            message={
              isSearch
                ? "Oops! No notes found matching your search"
                : "Start creating your first note! Click the 'Add' button to add your thoughts, ideas and remainders. Let's get started!"
            }
          />
        )}
      </div>

      {/* 右下角“+”按钮：绝对定位到父容器 (relative) 的 right-10 bottom-10 */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-xl bg-darkBackground dark:border-[3px] hover:border-[7px] hover:border-black dark:border-primary  absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] hover:text-[50px] text-primary" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        contentLabel=""
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Toast */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
