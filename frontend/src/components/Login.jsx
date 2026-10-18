import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          withCredentials: true,
        },
      );

      console.log("Login response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");

        setUser({
          userName: "",
          password: "",
        });
        dispatch(setAuthUser(res.data.user || res.data));
        navigate("/home");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col mb-30 items-center justify-center min-h-screen px-4 mx-auto text-black font-serif">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form action="" onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              value={user.userName}
              type="text"
              placeholder="UserName"
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="label p-2" htmlFor="password">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          {/* Link */}
          <p className="text-center text-sm my-3">
            You have a new User?
            <Link
              to="/signup"
              className="text-blue-600 underline font-semibold"
            >
              signUp
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="w-full btn btn-block btn-sm mt-2 border border-slate-700 py-2 h-10 bg-black text-white hover:bg-gray-800 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
