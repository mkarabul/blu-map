export const handleBlockUser = async (user, userName, block) => {
  if (!user || !userName) {
    return {
      ok: false,
      statusText: "User or userName not provided",
    };
  }

  try {
    const method = block ? "POST" : "DELETE";

    const response = await fetch(`/api/block/${userName}/${user.sub}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.sub,
        blockedUserId: userName,
      }),
    });

    if (response.ok) {
      console.log("Success for Block/Unblock User");
      return response;
    } else {
      console.error("Failed to handle block:", response.statusText);
      return {
        ok: false,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.error("Error toggling block status:", error);
    return {
      ok: false,
      statusText: "Failed to toggle block status",
    };
  }
};
