import React from "react";
import { FiCheck } from "react-icons/fi";

const OtherUser = (props) => {
  const user = props.user;

  const isOnline = true;
  const isSelected = false;

  return (
    <div
      className={`group flex w-full min-w-0 items-center gap-3
        rounded-xl border p-3 transition-all duration-200
        cursor-pointer
        ${
          isSelected
            ? "border-indigo-500/40 bg-indigo-500/15"
            : "border-transparent hover:border-slate-700 hover:bg-slate-800"
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
            Hey! How are you doing?
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
