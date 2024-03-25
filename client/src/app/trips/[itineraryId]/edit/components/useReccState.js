import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const useReccState = (serverReccs) => {
  const defaultReccs = ["Food", "Travel"];
  const [sReccs, setSReccs] = useState(serverReccs);

  const deleteServerRecc = async (recc) => {
    setSReccs(sReccs.filter((r) => r !== recc));

    const userId = await useUser().user.sub;
    await fetch(`/api/reccs/${recc}/${userId}`, {
      method: "DELETE",
    });
  };

  return {
    defaultReccs,
    serverReccs: sReccs,
    deleteServerRecc,
  };
};

export default useReccState;
