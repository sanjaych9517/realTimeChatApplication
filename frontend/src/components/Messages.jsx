

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice"; // 👈 Import setMessages

const Messages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const { socket } = useSelector((store) => store.socket); // 👈 Redux se socket nikal lein
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  // 🎧 Real-time message listener using Socket.io
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        dispatch(setMessages([...messages, newMessage]));
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, messages, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages?.length]);

  if (!Array.isArray(messages)) {
    return null;
  }

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
      <div className="flex flex-1 flex-col gap-3 sm:gap-4 justify-center">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center my-10">
            <p className="text-sm text-slate-400">
              Send a message to start chatting with{" "}
              {selectedUser?.fullName || "user"}!!
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            return <Message key={message._id || index} message={message} />;
          })
        )}
      </div>

      {/* Auto-scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;