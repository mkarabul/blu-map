import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useReccState = () => {
  const defaultReccs = ["Food", "Travel"];
  const { user, error, isLoading } = useUser();
  const [serverReccs, setServerReccs] = useState([]);

  useEffect(() => {
    const fillServerRecs = async () => {
      if (!user) return;

      const response = await fetch(`/api/recommendations/user/${user?.sub}`);
      const recs = await response.json();

      setServerReccs(recs.map((rec) => rec.activity));
    };

    fillServerRecs();
  }, [user]);

  const deleteServerRecc = async (rec) => {
    setServerReccs(serverReccs.filter((r) => r !== rec));

    if (!user) return;

    fetch(`/api/recommendations/${user?.sub}/${rec}`, {
      method: "DELETE",
    });
  };

  return {
    defaultReccs,
    serverReccs,
    deleteServerRecc,
  };
};

export default useReccState;
