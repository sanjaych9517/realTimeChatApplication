import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // my custom hooks
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return;
  return (
    <div
      className="flex flex-col gap-1 overflow-y-auto
        overscroll-contain py-1
        scrollbar-thin
        [scrollbar-color:#334155_transparent]"
    >
      {otherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
