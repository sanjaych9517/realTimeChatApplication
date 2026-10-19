import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [search, setSearch] = useState("");

  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (otherUsers && allUsers.length === 0) {
      setAllUsers(otherUsers);
    }
  }, [otherUsers]);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate(`/login`);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    
    if (!search.trim()) {
      dispatch(setOtherUsers(allUsers));
      return;
    }

   
    const conversationUser = allUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversationUser) {
      
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }

    
    setSearch("");
  };

  return (
    <aside
      className="flex h-full min-h-0 w-full flex-col
      overflow-hidden rounded-2xl border border-slate-700/60
      bg-slate-900 text-white shadow-xl"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3
        border-b border-slate-700/60 p-4 sm:p-5"
      >
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-wide sm:text-xl">
            Chat-Application
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Connect with your friends
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUsers(!showUsers)}
          className="flex h-10 w-10 shrink-0 items-center
            justify-center rounded-xl bg-slate-800
            text-slate-300 transition hover:bg-indigo-600
            hover:text-white md:hidden"
          aria-label={showUsers ? "Hide contacts" : "Show contacts"}
          aria-expanded={showUsers}
        >
          {showUsers ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Search */}
      <div className="p-3 sm:p-4">
        <form
          onSubmit={searchSubmitHandler}
          className="flex items-center gap-2 rounded-xl
            border border-slate-700 bg-slate-800/80 p-1.5
            transition focus-within:border-indigo-500
            focus-within:ring-2 focus-within:ring-indigo-500/20"
        >
          <FaSearch className="ml-2 shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="min-w-0 flex-1 bg-transparent px-1
              py-2 text-sm text-white outline-none
              placeholder:text-slate-500"
          />

          <button
            type="submit"
            aria-label="Search"
            className="rounded-lg bg-indigo-600 px-3 py-2
              text-sm font-medium transition hover:bg-indigo-500
              active:scale-95"
          >
            Search
          </button>
        </form>
      </div>

      {/* Contacts */}
      <div className="flex min-h-0 flex-1 flex-col px-2 sm:px-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <span
            className="text-xs font-semibold uppercase
            tracking-widest text-slate-400"
          >
            Recent chats
          </span>
        </div>

        {showUsers && (
          <div
            className="min-h-0 flex-1 overflow-y-auto
            overscroll-contain pr-1"
          >
            <OtherUsers />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/60 p-3 sm:p-4">
        <button
          onClick={logoutHandler}
          type="button"
          className="flex w-full items-center justify-center
            gap-2 rounded-xl border border-slate-700
            bg-slate-800 px-4 py-3 text-sm font-semibold
            text-slate-300 transition hover:border-red-500/40
            hover:bg-red-500/10 hover:text-red-400"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
