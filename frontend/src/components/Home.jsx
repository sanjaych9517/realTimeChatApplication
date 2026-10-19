

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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