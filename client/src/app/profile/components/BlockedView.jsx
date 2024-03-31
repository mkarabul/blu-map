import { getSession } from "@auth0/nextjs-auth0";
import React from "react";

const BlockedView = async ({ userName, children }) => {
  try {
    const { user, accessToken } = await getSession();

    const response = await fetch(
      `${process.env.API_URL}/api/block/profile/${userName}/${user?.sub}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const boolean = await response.json();
    const blocked = boolean.blocked;
    if (blocked)
      return (
        <h2 className="text-center m-4">
          You do not have access to this profile
        </h2>
      );
  } catch (error) {
    console.error("Error checking block status:", error);
  }

  return <>{children}</>;
};

export default BlockedView;
