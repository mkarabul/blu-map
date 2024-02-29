import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = async (req, session, state) => {
  // Add the user's access token to the request headers
  fetch(`${process.env.API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
