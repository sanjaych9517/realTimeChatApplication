

import React, { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = () => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className="flex min-h-0 flex-1 flex-col
        overflow-y-auto overflow-x-hidden
        overscroll-contain px-3 py-4
        sm:px-5 sm:py-5 lg:px-6
        scrollbar-thin
        [scrollbar-color:#334155_transparent]"
    >
      {/* Date Separator */}
      <div className="my-3 flex items-center justify-center">
        <span
          className="rounded-full border border-slate-700/60
          bg-slate-800/80 px-4 py-1.5 text-xs
          font-medium text-slate-400"
        >
          Today
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      {/* Auto-scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
