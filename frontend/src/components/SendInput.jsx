import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHamdler = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Message:", message);
      dispatch(setMessages([...messages, res?.data.newMessage]));
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

  return (
    <form
      onSubmit={onSubmitHamdler}
      className="flex w-full items-center gap-2 sm:gap-3"
    >
      {/* Emoji Button */}
      <button
        type="button"
        aria-label="Choose emoji"
        className="hidden h-11 w-11 shrink-0 items-center
          justify-center rounded-xl text-slate-400
          transition hover:bg-slate-800 hover:text-indigo-400
          sm:flex"
      >
        <FiSmile size={22} />
      </button>

      {/* Message Input */}
      <div
        className="flex min-w-0 flex-1 items-center
        rounded-2xl border border-slate-700/70
        bg-slate-800/80 px-3 transition
        focus-within:border-indigo-500
        focus-within:ring-2 focus-within:ring-indigo-500/20
        sm:px-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          aria-label="Type a message"
          className="min-w-0 flex-1 bg-transparent
            py-3 text-sm text-white outline-none
            placeholder:text-slate-500 sm:py-3.5 sm:text-base"
        />
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={!message.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center
          justify-center rounded-xl bg-indigo-600
          text-white shadow-lg shadow-indigo-950/30
          transition duration-200 hover:bg-indigo-500
          active:scale-95 disabled:cursor-not-allowed
          disabled:bg-slate-700 disabled:text-slate-500
          disabled:shadow-none sm:h-12 sm:w-12"
      >
        <IoIosSend size={25} />
      </button>
    </form>
  );
};

export default SendInput;
