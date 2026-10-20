
import React from "react";
import { FiArrowLeft, FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import Messages from "./Messages";
import SendInput from "./SendInput";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.user); // 👈 1. onlineUsers ko Redux se nikal lein
  const navigate = useNavigate();
  const useDispatchAction = useDispatch();

  // Check karein ki selected user online hai ya nahi
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const handleBackClick = () => {
    useDispatchAction(setSelectedUser(null));
    navigate("/home");
  };

  return (
    <div
      className="flex h-full min-h-0 min-w-0 flex-1
      flex-col overflow-hidden rounded-2xl
      border border-slate-700/60 bg-slate-900
      text-white shadow-xl"
    >
      {/* Chat Header */}
      <header
        className="flex shrink-0 items-center gap-3
        border-b border-slate-700/60 bg-slate-900/95
        px-3 py-3 sm:px-5 sm:py-4"
      >
        {/* Mobile Back Button */}
        <button
          type="button"
          onClick={handleBackClick}
          aria-label="Back to contacts"
          className="flex h-9 w-9 shrink-0 items-center
            justify-center rounded-lg text-slate-300
            transition hover:bg-slate-800 hover:text-white
            md:hidden"
        >
          <FiArrowLeft size={21} />
        </button>

        {/* Profile */}
        <div className="relative shrink-0">
          <img
            src={
              selectedUser?.profilePhoto ||
              "https://i.pinimg.com/originals/5a/e1/74/5ae174023bbb4a5dfe8baaf9aca8af7d.jpg?nii=t"
            }
            alt={selectedUser?.fullName || "Profile"}
            className="h-10 w-10 rounded-full object-cover
              ring-2 ring-slate-700 sm:h-12 sm:w-12"
          />

          {/* 👈 2. Dynamic Green/Offline Indicator Dot */}
          {isOnline && (
            <span
              className="absolute bottom-0 right-0 h-3 w-3
              rounded-full border-2 border-slate-900
              bg-emerald-400"
            />
          )}
        </div>

        {/* User Info */}
        <div className="min-w-0 flex-1">
          <h2
            className="truncate text-sm font-bold
            text-white sm:text-base"
          >
            {selectedUser?.fullName || "Select a user"}
          </h2>

          {/* 👈 3. Dynamic Text: Online ya Offline */}
          <p
            className={`mt-0.5 text-xs ${isOnline ? "text-emerald-400" : "text-slate-400"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Voice call"
            className="flex h-9 w-9 items-center justify-center
              rounded-xl text-slate-300 transition
              hover:bg-slate-800 hover:text-indigo-400
              sm:h-10 sm:w-10"
          >
            <FiPhone size={18} />
          </button>

          <button
            type="button"
            aria-label="Video call"
            className="flex h-9 w-9 items-center justify-center
              rounded-xl text-slate-300 transition
              hover:bg-slate-800 hover:text-indigo-400
              sm:h-10 sm:w-10"
          >
            <FiVideo size={20} />
          </button>

          <button
            type="button"
            aria-label="More options"
            className="flex h-9 w-8 items-center justify-center
              rounded-xl text-slate-300 transition
              hover:bg-slate-800 hover:text-white"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main
        className="flex min-h-0 flex-1 flex-col overflow-hidden
        bg-linear-to-b from-slate-900 to-slate-950"
      >
        <Messages />
      </main>

      {/* Message Input */}
      <div
        className="shrink-0 border-t border-slate-700/60
        bg-slate-900 p-2 sm:p-3"
      >
        <SendInput />
      </div>
    </div>
  );
};

export default MessageContainer;