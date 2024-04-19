/**
 * @jest-environment node
 */

import middleware from "../middleware";
import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@auth0/nextjs-auth0/edge", () => ({
  getSession: jest.fn(() => ({
    accessToken: "token",
  })),
  withMiddlewareAuthRequired: jest.fn((fn) => (req) => fn(req)),
}));

describe("middleware", () => {
  it("should call getSession with the request", async () => {
    const req = new NextRequest(new URL("http://localhost:3000/api"));
    await middleware(req);
    expect(getSession).toHaveBeenCalledWith();
  });

  it("should return authMiddleware if user is authenticated", async () => {
    const req = new NextRequest(new URL("http://localhost:3000/trips"));
    getSession.mockReturnValueOnce({ accessToken: "token" });
    const result = await middleware(req);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("headers");
    expect(result.headers.get("Authorization")).toBe("Bearer token");
  });
});
