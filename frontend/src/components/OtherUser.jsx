

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = () => {
   
    dispatch(setSelectedUser(user));

    
    navigate(`/home/${user._id}`);
  };

  return (
    <div
      onClick={handleUserClick}
      className="flex gap-2 items-center p-2 rounded cursor-pointer hover:bg-slate-800"
    >
      <img
        src={user?.profilePhoto}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <p className="text-white">{user?.fullName}</p>
    </div>
  );
};

export default OtherUser;