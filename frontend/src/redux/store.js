// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice.js";
// import messageReducer from "./messageSlice.js";
// import socketReducer from "./socketSlice.js";
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     message: messageReducer,
//     socket: socketReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Yeh line Redux ko non-serializable errors/warnings ignore karne ke liye bolti hai
        ignoredActions: [
          "socket/setSocket",
          "User/setOnlineUsers",
          "User/setOtherUsers",
        ],
        ignoredPaths: ["socket.socket"],
      },
    }),
});

export default store;
