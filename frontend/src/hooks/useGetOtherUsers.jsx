
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/user/`, {
          withCredentials: true, // Yeh yahan bhi hona chahiye
        });
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(
          "Get other users error:",
          error.response?.data || error.message,
        );
      }
    };
    fetchOtherUsers();
  }, [dispatch, apiUrl]);
};

export default useGetOtherUsers;