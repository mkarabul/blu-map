import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired(async function middleware(req) {
  // Ignore the middleware for the /api/auth/* routes
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  const user = await getSession(req, response);
  const token = user?.accessToken;

  response.headers.set("Authorization", `Bearer ${token}`);

  return response;
});

export const config = {
  matcher: ["/trips/:path*", "/api/:path*"],
  // matcher: ["/trips/:path*"],
};
