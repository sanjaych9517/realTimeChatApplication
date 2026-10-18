import React from "react";
import { FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {  setSelectedUser,  } from "../redux/userSlice";


const OtherUser = ({ user }) => {

  const dispatch = useDispatch();
 
const { selectedUser } = useSelector((store) => store.user);
const { messages } = useSelector((store) => store.message);

  const isOnline = true; ///
  // const isSelected = false;////
  const selectedUserhandler = (user) => {
    console.log(user);
    dispatch(setSelectedUser(user));
  };
// 
  return (
    <div
      onClick={() => selectedUserhandler(user)}
      className={`group flex w-full min-w-0 items-center gap-3
        rounded-xl border p-3 transition-all duration-200
        cursor-pointer
        ${
          selectedUser?._id === user?._id
            ? "border-indigo-500/40 bg-indigo-500/15"
            : "border-transparent hover:border-slate-600 hover:bg-slate-700"
        }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="h-11 w-11 overflow-hidden rounded-full
          ring-2 ring-slate-700 transition
          group-hover:ring-indigo-500 sm:h-12 sm:w-12"
        >
          <img
            src={user?.profilePhoto}
            alt="User profile"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {isOnline && (
          <span
            className="absolute bottom-0 right-0 h-3 w-3
              rounded-full border-2 border-slate-900
              bg-emerald-400"
            aria-label="Online"
          />
        )}
      </div>

      {/* User details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="truncate text-sm font-semibold
            text-slate-100 transition
            group-hover:text-indigo-300 sm:text-base"
          >
            {user?.fullName}
          </h3>
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <FiCheck size={14} className="shrink-0 text-indigo-400" />

          <p className="truncate text-xs text-slate-400 sm:text-sm">
            {/* {messages && messages.length > 0
              ? messages[messages.length - 1]?.message
              : "No messages yet"} */}

            <p className="truncate text-xs text-slate-400 sm:text-sm">
              {user?.lastMessage?.message || "No messages yet"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
