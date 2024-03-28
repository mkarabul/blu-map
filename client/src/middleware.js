import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

const authMiddleware = withMiddlewareAuthRequired(async (req) => {
  // Ignore the middleware for the /api/auth/* routes
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

export default async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  const user = await getSession();
  if (
    user ||
    req.nextUrl.pathname.startsWith("/trips") ||
    req.nextUrl.pathname.startsWith("/feed") ||
    req.nextUrl.pathname.startsWith("/settings") ||
    req.nextUrl.pathname.startsWith("/notifications") ||
    req.nextUrl.pathname.startsWith("/profile")
  ) {
    return authMiddleware(req);
  }

  return rewriteToAPI(req);
}

export const config = {
  matcher: [
    "/trips/:path*",
    "/api/:path*",
    "/feed/:path*",
    "/settings/:path*",
    "/notifications/:path*",
    "/profile",
  ],
};
