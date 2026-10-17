import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mx-auto text-black font-serif">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form action="">
          <div className="mb-3 text-xl font-medium">
            <label className="label p-2 " htmlFor="fullname">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="UserName"
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
              placeholder="Password"
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="label p-2" htmlFor="conformpassword">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              id="conformpassword"
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center justify-around my-4">
            <div className="flex items-center">
              <span className="mr-2">Male</span>
              <input
                type="radio"
                name="gender"
                value="male"
                defaultChecked
                className="radio"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2">Female</span>
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio"
              />
            </div>
          </div>

          {/* Link */}
          <p className="text-center text-sm my-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline font-semibold">
              Login
            </Link>
          </p>

          <div>
            <button className="w-full btn btn-block btn-sm mt-2 border border-slate-700 py-2 h-10 bg-black text-white hover:bg-gray-800 rounded">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
