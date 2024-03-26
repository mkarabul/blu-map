import { useEffect, useState } from "react";

const useReccState = (serverReccs) => {
  const defaultReccs = ["Food", "Travel"];
  const [sReccs, setSReccs] = useState(serverReccs);

  useEffect(() => {
    setSReccs(serverReccs);
  }, [serverReccs]);

  const deleteServerRecc = async (recc) => {
    setSReccs(sReccs.filter((r) => r !== recc));
  };

  return {
    defaultReccs,
    serverReccs: sReccs,
    deleteServerRecc,
  };
};

export default useReccState;
