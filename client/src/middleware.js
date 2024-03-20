import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired(async (req) => {
  // Ignore the middleware for the /api/auth/* routes
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  let response;

  if (req.nextUrl.pathname.startsWith("/api")) {
    response = await rewriteToAPI(req);
  } else {
    response = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });
  }

  const user = await getSession(req, response);
  const token = user?.accessToken;

  response.headers.set("Authorization", `Bearer ${token}`);

  return response;
});

const rewriteToAPI = async (req) => {
  const destination = new URL(process.env.API_URL);
  const url = req.nextUrl.clone();
  url.host = destination.host;
  url.port = destination.port;

  return NextResponse.rewrite(url);
};

export const config = {
  matcher: ["/trips/:path*", "/api/:path*"],
  // matcher: ["/trips/:path*"],
};
