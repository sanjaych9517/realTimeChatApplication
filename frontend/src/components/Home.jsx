
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // useSelector ko import kiya

const Home = () => {
  const navigate = useNavigate();

  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  
  if (!authUser) {
    return null;
  }

  return (
    <div className="h-dvh overflow-hidden bg-slate-950 p-2 sm:p-4">
      <div className="mx-auto flex h-full max-w-7xl gap-3 sm:gap-4">
        <div className="hidden w-72 shrink-0 md:flex lg:w-80">
          <Sidebar />
        </div>

        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
