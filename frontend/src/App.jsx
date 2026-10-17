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
    <div className="bg-[url('https://static.vecteezy.com/system/resources/thumbnails/052/401/834/small/art-abstract-blurred-beautiful-spring-background-with-fresh-leaves-photo.jpg')] bg-cover bg-center min-h-screen p-4  h-screen flex justify-center items-center font-serif">
      <RouterProvider router={router} />
     
    </div>
  );
}

export default App;
