export const handleBlockUser = async (user, userName, block) => {
  if (!user || !userName) return;

  try {
    const method = block ? "POST" : "DELETE";
    const response = await fetch(`/api/block/profile/${user.sub}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        userId: user.sub,
        blockedUserId: userName,
      }),
    });

    if (response.ok) {
      console.log("Success for Block/Unblock User");
    } else {
      console.error("Failed to handle block:", response.statusText);
    }

    return response;
  } catch (error) {
    console.error("Error toggling block status:", error);
    throw new Error("Failed to toggle block status");
  }
};
