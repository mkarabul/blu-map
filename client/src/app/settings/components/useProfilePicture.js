import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useProfilePicture = () => {
  const { user } = useUser();
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    confirmation: "",
  });

  const uploadProfilePicture = async (imageData) => {
    setState({ ...state, isLoading: true });

    try {
      const response = await fetch(`api/profile-picture/${user.sub}`, {
        method: "POST",
        body: imageData,
      });
      if (!response.ok) {
        throw new Error("Error uploading profile picture");
      }
      const data = await response.json();
      setState({
        ...state,
        isLoading: false,
        confirmation: "Profile picture updated successfully",
      });
      return data;
    } catch (error) {
      setState({ ...state, isLoading: false, error: error.message });
    }
  };

  const deleteProfilePicture = async () => {
    setState({ ...state, isLoading: true });

    try {
      const response = await fetch(`api/profile-picture/${user.sub}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting profile picture");
      }
      setState({
        ...state,
        isLoading: false,
        confirmation: "Profile picture deleted successfully",
      });
    } catch (error) {
      setState({ ...state, isLoading: false, error: error.message });
    }
  };

  return { state, uploadProfilePicture, deleteProfilePicture };
};

export default useProfilePicture;
