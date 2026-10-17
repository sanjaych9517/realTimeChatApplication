import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    userNmae: "",
    passwors: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({
      userNmae: "",
      passwors: "",
    });
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
              value={user.userNmae}
              type="text"
              placeholder="UserName"
              onChange={(e) => setUser({ ...user, userNmae: e.target.value })}
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
              value={user.passwors}
              placeholder="Password"
              onChange={(e) => setUser({ ...user, passwors: e.target.value })}
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
