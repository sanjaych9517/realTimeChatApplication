import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    conformPassword: "",
    gender: "",
  });
const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleRadioButton = (selectedGender) => {
    setUser({ ...user, gender: selectedGender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await axios.post(
        `${apiUrl}/api/v1/user/register`,
        
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      conformPassword: "",
      gender: "",
    });
  };
  return (
    <div className="flex flex-col mb-30 items-center justify-center min-h-screen px-4 mx-auto text-black font-serif">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form action="" onSubmit={onSubmitHandler}>
          <div className="mb-3 text-xl font-medium">
            <label className="label p-2 " htmlFor="fullname">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
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
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
              value={user.conformPassword}
              id="conformpassword"
              type="password"
              placeholder="Confirm password"
              onChange={(e) =>
                setUser({ ...user, conformPassword: e.target.value })
              }
              className="w-full input input-bordered h-10 px-3 bg-white/50 text-black placeholder-gray-500 rounded"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center justify-around my-4">
            <div className="flex items-center">
              <label htmlFor="male">
                <span className="mr-2">Male</span>
              </label>
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio"
                id="male"
                checked={user.gender === "male"}
                onChange={() => handleRadioButton("male")}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="female">
                <span className="mr-2">Female</span>
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                className="radio"
                checked={user.gender === "female"}
                onChange={() => handleRadioButton("female")}
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
            <button
              type="submit"
              className="w-full btn btn-block btn-sm mt-2 border border-slate-700 py-2 h-10 bg-black text-white hover:bg-gray-800 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
