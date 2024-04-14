import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useCreatePost = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState({});
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    confirmation: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch(`api/users/${user?.sub}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error occurred while uploading photo: ", error);
      }
    };
    if (user) {
      loadUserData();
    }
  }, [user]);

  const createUserImage = async (imageData, tripId) => {
    setState({ ...state, isLoading: true });

    try {
      const response = await fetch(`api/profile-trip/${tripId}/images`, {
        method: "PATCH",
        body: imageData,
      });
      if (!response.ok) {
        throw new Error("Error creating image");
      }
      const data = await response.json();
      setState({ ...state, isLoading: false });
      setState({ ...state, confirmation: "Profile post created successfully" });
      return data;
    } catch (error) {
      setState({ ...state, confirmation: "" });
      setState({ ...state, isLoading: false, error: error.message });
    }
  };

  return { userData, state, createUserImage };
};

export default useCreatePost;
