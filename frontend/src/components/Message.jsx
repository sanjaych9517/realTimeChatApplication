

import React from "react";
import { BsCheck2All } from "react-icons/bs";

const Message = () => {
  // Demo: true = apna message, false = receiver ka message
  const isSender = true;

  const message = {
    text: "Hey! You were the Chosen One!",
    time: "12:45 PM",
  };

  return (
    <div
      className={`flex w-full items-end gap-2 sm:gap-3
        ${isSender ? "justify-end" : "justify-start"}`}
    >
      {/* Receiver Avatar */}
      {!isSender && (
        <img
          src="https://i.pinimg.com/originals/5a/e1/74/5ae174023bbb4a5dfe8baaf9aca8af7d.jpg?nii=t"
          alt="Sender profile"
          className="mb-5 h-8 w-8 shrink-0 rounded-full
            object-cover ring-1 ring-slate-700 sm:h-9 sm:w-9"
        />
      )}

      {/* Message Content */}
      <div
        className={`flex min-w-0 max-w-[85%] flex-col
          sm:max-w-[75%] lg:max-w-[65%]
          ${isSender ? "items-end" : "items-start"}`}
      >
        {/* Bubble */}
        <div
          className={`rounded-2xl px-3 py-2.5 shadow-md
            sm:px-4 sm:py-3
            ${
              isSender
                ? "rounded-br-md bg-indigo-600 text-white"
                : "rounded-bl-md border border-slate-700/60 bg-slate-800 text-slate-100"
            }`}
        >
          <p className="wrap-break text-sm leading-6 sm:text-base">
            {message.text}
          </p>
        </div>

        {/* Time and Status */}
        <div className="mt-1 flex items-center gap-1.5 px-1">
          <span className="text-[10px] text-slate-500 sm:text-xs">
            {message.time}
          </span>

          {isSender && (
            <BsCheck2All
              size={14}
              className="text-sky-400"
              aria-label="Message read"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
