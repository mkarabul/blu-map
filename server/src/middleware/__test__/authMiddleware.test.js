const { checkJwt, getUserInfoMiddleware } = require("../authMiddleware");

const { auth } = require("express-oauth2-jwt-bearer");
const { UserInfoClient } = require("auth0");
const cache = require("../../config/cache");

jest.mock("express-oauth2-jwt-bearer", () => ({
  auth: jest.fn(() => (req, res, next) => next()),
}));

jest.mock("auth0", () => ({
  UserInfoClient: jest.fn(() => ({
    getUserInfo: jest.fn(() => ({ data: { user: "user" } })),
  })),
}));

jest.mock("../../config/cache", () => ({
  get: jest.fn(() => null),
  set: jest.fn(),
}));

describe("authMiddleware", () => {
  describe("getUserInfoMiddleware", () => {
    it("should call the next middleware function", async () => {
      const req = { auth: { token: "token" } };

      const next = jest.fn();

      await getUserInfoMiddleware(req, {}, next);

      expect(next).toHaveBeenCalled();
    });

    it("should handle errors and send a response with status 500", async () => {
      const req = { auth: { token: "token" } };

      const next = jest.fn();

      cache.get.mockImplementationOnce(() => {
        throw new Error("error");
      });

      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await getUserInfoMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.send).toHaveBeenCalledWith({ error: "Internal Server Error" });

      expect(next).not.toHaveBeenCalled();

      cache.get.mockReset();
    });

    it("should get the user from the cache", async () => {
      const req = { auth: { token: "token" } };

      const next = jest.fn();

      cache.get.mockImplementationOnce(() => JSON.stringify({ user: "user" }));

      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await getUserInfoMiddleware(req, res, next);

      expect(cache.get).toHaveBeenCalledWith("token");

      expect(req.user).toEqual({ user: "user" });

      expect(next).toHaveBeenCalled();

      cache.get.mockReset();
    });

    it("should update the cache", async () => {
      const req = { auth: { token: "token" } };

      const next = jest.fn();

      cache.get.mockImplementationOnce(() => null);

      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await getUserInfoMiddleware(req, res, next);

      expect(cache.set).toHaveBeenCalledWith(
        "token",
        JSON.stringify({ user: "user" })
      );
    });

    it("should set the user in the request object", async () => {
      const req = { auth: { token: "token " } };

      const next = jest.fn();

      cache.get.mockImplementationOnce(() => null);

      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await getUserInfoMiddleware(req, res, next);

      expect(req.user).toEqual({ user: "user" });

      cache.get.mockReset();
    });
  });
});
