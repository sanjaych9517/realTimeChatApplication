import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server, io } from "./socket/socket.js";
dotenv.config({});
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
//   origin:FRONTEND_URL,
//   credentials: true,
// };
// app.use(cors(corsOptions));

//home route
app.get("/", (req, res) => {
  res.send(" this is home route !");
});
// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  connectDB();
});
