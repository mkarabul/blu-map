import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const mockTrips = [
  { title: "trip", id: "hdfshffjddfjkdfjbkbnnm" },
  { title: "trip", id: "asdkjfhjdsfj" },
  { title: "trip", id: "qieoerhfm" },
  { title: "trip", id: "fadskjgukewqljkl" },
  { title: "trip", id: "fnmabenr" },
  { title: "trip", id: "fdsjksdfajhgdsfkhj" },
  { title: "trip", id: "dafs,jadsfhkfu" },
];

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
      } catch (error) {
        console.error("Error loading trips:", error);
      } finally {
        setIsLoading(false);
        setTrips(mockTrips);
      }
    };

    if (user) {
      loadTrips();
    }
  }, [user]);

  return { trips, isLoading: isLoading || isUserLoading };
};

export default useLoadTrips;
