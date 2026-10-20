import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // 👈 useDispatch import karein
import { setOnlineUsers } from "../redux/userSlice"; // 👈 setOnlineUsers import karein
import io from "socket.io-client"; // 👈 socket.io-client import karein

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch(); // 👈 dispatch initialize karein
  const apiUrl = import.meta.env.VITE_API_URL; // 👈 backend URL

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  // 🔴 SOCKET CONNECTION AUR ONLINE USERS LISTEN KARNE KA LOGIC (Yahi missing tha)
  useEffect(() => {
    if (authUser) {
      const socket = io(apiUrl, {
        query: {
          userId: authUser._id,
        },
        withCredentials: true,
      });

      // Backend se online users ki list sunna
      socket.on("getOnlinesUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      // Cleanup on unmount
      return () => socket.close();
    }
  }, [authUser, apiUrl, dispatch]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="h-dvh overflow-hidden bg-slate-950 p-2 sm:p-4 w-full">
      <div className="mx-auto flex h-full max-w-7xl gap-3 sm:gap-4 relative overflow-hidden">
        <div
          className={`w-full sm:w-72 lg:w-80 shrink-0 ${
            id ? "hidden sm:flex" : "flex"
          }`}
        >
          <Sidebar />
        </div>

        <div className={`flex-1 h-full ${id ? "flex" : "hidden sm:flex"}`}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
    