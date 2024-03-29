import { getSession } from "@auth0/nextjs-auth0";
import React from "react";

const BlockedView = async ({ userId, children }) => {
  try {
    const blockedUser = await getSession();
    const response = await fetch(
      `${process.env.API_URL}/api/block/profile/${userId}/${blockedUser.user?.sub}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("Success for Block/Unblock User");
    }

    const boolean = await response.json();
    const blocked = boolean.blocked;
    if (blocked) return <div>You do not have access to this profile</div>;
  } catch (error) {
    console.error("Error checking block status:", error);
  }

  return <>{children}</>;
};

export default BlockedView;
