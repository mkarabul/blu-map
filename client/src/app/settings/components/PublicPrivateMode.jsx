
import { useState, useEffect } from 'react';

const usePublicPrivateMode = (userID) => {
  const [mode, setMode] = useState("public");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID) return;

    const fetchUserMode = async () => {
      try {
        const response = await fetch(`/api/admin/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setMode(userData.isPublic ? "public" : "private");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserMode();
  }, [userID]);

  const toggleMode = async () => {
    try {
      const newMode = mode === "public" ? "private" : "public";
      const response = await fetch(`/api/users/mode/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublic: newMode === "public" })
      });

      if (!response.ok) {
        throw new Error("Failed to toggle mode");
      }

      setMode(newMode);
      alert(`You are now in ${newMode} mode.`);
    } catch (error) {
      console.error("Error toggling mode:", error);
      setError(error);
    }
  };

  return { mode, loading, error, toggleMode };
};

export default usePublicPrivateMode;
