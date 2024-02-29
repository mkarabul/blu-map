import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useLoadTrips = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`api/itineraries/user/${user?.sub}`);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error loading trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadTrips();
    }
  }, [user]);

  return { trips, isLoading: isLoading || isUserLoading };
};

export default useLoadTrips;
