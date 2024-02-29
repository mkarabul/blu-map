import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = async (req, session, state) => {
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
