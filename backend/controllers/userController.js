import { User } from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//  registration ---------------------------------------------------------------------

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, conformPassword, gender } = req.body;
    if (!fullName || !userName || !password || !conformPassword || !gender) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    if (password !== conformPassword) {
      return res.status(400).json({
        message: "Password don't match",
        success: false,
      });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
      });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    //  profile photo

    await User.create({
      fullName,
      userName,
      password: hashPassword,
      profilePhoto:
        gender === "male"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGEEw05JC04hBIqjVUi0Rkc0W4NFpWPGKNDKfy2BaVjXu1C53gaSo8GE&s=10"
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-NtsIcrPIlshQPzorEcktiR-_R98Q2WdADu6QONXhh8oKoaQrPwLCUog&s=10",
      gender,
    });
    // Send response
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// login -----------------------------------------------------

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(201).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect userName or password",
        ststus: false,
      });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect userName or password",
        ststus: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        success: true,
        user: {
          _id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          profilePhoto: user.profilePhoto,
        },
      });
  } catch (error) {
    console.log(error);
  }
};

// logout --------------------------------------------------

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
// other users -------------------------------------------------------
export const getOtherUsers = async (req, res) => {
  try {
    const loogeddInUserId = req.id;
    const otherUsers = await User.find({
      _id: { $ne: loogeddInUserId },
    }).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
