import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
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
  return (
    <div className="bg-[url('https://media.istockphoto.com/id/587795072/vector/abstract-background-sunset-silhouette-mountain-scenery.jpg?s=612x612&w=0&k=20&c=4vu9hnrDyePWiE22QRkgVtJKz1xVdb0Z1W04_kJq5hw=')] bg-cover bg-center min-h-screen p-4  h-screen flex justify-center items-center font-serif">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
