import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Sirf ID nikal rahe hain taaki har render par naya object reference issue na kare
  const selectedUserId = selectedUser?._id;

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return;
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUserId}`,
        );
        console.log(res);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUserId]); // Dependency mein sirf ID hai
};

export default useGetMessages;
