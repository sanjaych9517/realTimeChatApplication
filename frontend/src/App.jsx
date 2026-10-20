import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/:id",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socketConnection = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketConnection));
      socketConnection.on("getOnlinesUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="bg-[url('https://media.istockphoto.com/id/587795072/vector/abstract-background-sunset-silhouette-mountain-scenery.jpg?s=612x612&w=0&k=20&c=4vu9hnrDyePWiE22QRkgVtJKz1xVdb0Z1W04_kJq5hw=')] bg-cover bg-center min-h-screen p-4 h-screen flex justify-center items-center font-serif">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
