
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.user);

  // Check karein ki yeh user online hai ya nahi
  const isOnline = onlineUsers?.includes(user._id);

  // User select karne aur navigate karne ka function
  const handleUserClick = () => {
    dispatch(setSelectedUser(user));
    navigate(`/home/${user._id}`);
  };

  return (
    <div
      onClick={handleUserClick}
      className={`flex items-center gap-3 p-2 hover:bg-slate-800 cursor-pointer rounded-lg relative ${
        selectedUser?._id === user?._id ? "bg-slate-800" : ""
      }`}
    >
      {/* Profile Avatar aur Online Dot ka container */}
      <div className="relative">
        <img
          src={user?.profilePhoto}
          alt="user-profile"
          className="w-12 h-12 rounded-full"
        />

        {/* Agar user online hai toh yeh blue dot dikhega */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 border-2 border-slate-900 rounded-full"></span>
        )}
      </div>

      <div>
        <p className="text-white font-medium">{user?.fullName}</p>
      </div>
    </div>
  );
};

export default OtherUser;