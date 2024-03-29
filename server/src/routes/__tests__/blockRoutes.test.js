const request = require("supertest");
const express = require("express");
const blockRoutes = require("../blockRoutes");
const Block = require("../../models/Block");
const User = require("../../models/User");

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testUserId" };
    next();
  }),
}));

jest.mock("../../models/User", () => ({
  findOne: jest.fn(),
}));
jest.mock("../../models/Block", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  User.findOne.mockReset();
  Block.create.mockReset();
});

const app = express();
app.use(express.json());
app.use("/api/blocks", blockRoutes);

describe("BlockController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createBlock", () => {
    it("should create a block successfully", async () => {
      User.findOne.mockResolvedValue({ userId: "123" });
      Block.create.mockResolvedValue({
        userId: "testUserId",
        blockedUserId: "123",
      });

      const res = await request(app)
        .post("/api/blocks/testUser/123")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("userId", "testUserId");
      expect(res.body).toHaveProperty("blockedUserId", "123");
    });

    it("should handle creation errors gracefully", async () => {
      User.findOne.mockRejectedValue(new Error("User not found"));

      const res = await request(app)
        .post("/api/blocks/testUser/123")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("removeBlock", () => {
    it("should remove a block successfully", async () => {
      User.findOne.mockResolvedValue({ userId: "123" });
      Block.findOne.mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true),
      });

      const res = await request(app)
        .delete("/api/blocks/testUser/123")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(204);
    });

    it("should return 404 if block not found", async () => {
      User.findOne.mockResolvedValue({ userId: "123" });
      Block.findOne.mockResolvedValue(null);

      const res = await request(app)
        .delete("/api/blocks/testUser/123")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ error: "Block not found" });
    });
  });

  describe("getBlockedUsers", () => {
    it("should get blocked users successfully", async () => {
      User.findOne.mockResolvedValue({ userId: "123" });
      Block.findAll.mockResolvedValue([
        { userId: "testUserId", blockedUserId: "456" },
      ]);

      const res = await request(app)
        .get("/api/blocks/testUser")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([{ userId: "testUserId", blockedUserId: "456" }])
      );
    });
  });

  describe("getBlocked", () => {
    it("should get a blocked user successfully", async () => {
      User.findOne.mockResolvedValue({ userId: "123" });
      Block.findOne.mockResolvedValue({
        userId: "testUserId",
        blockedUserId: "123",
      });

      const res = await request(app)
        .get("/api/blocks/testUser/123")
        .set("Authorization", "Bearer testToken")
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ userId: "testUserId", blockedUserId: "123" });
    });
  });

  //   describe("isBlocked", () => {
  //     it("should report true if user is blocked", async () => {
  //       User.findOne.mockResolvedValue({ userId: "123" });
  //       Block.findOne.mockResolvedValue({
  //         userId: "testUserId",
  //         blockedUserId: "456",
  //       });

  //       const res = await request(app)
  //         .get("/api/blocks/isBlocked/testUser/456")
  //         .set("Authorization", "Bearer testToken")
  //         .send();

  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body).toEqual({ blocked: true });
  //     });

  //     it("should report false if user is not blocked", async () => {
  //       User.findOne.mockResolvedValue({ userId: "123" });
  //       Block.findOne.mockResolvedValue(null);

  //       const res = await request(app)
  //         .get("/api/blocks/isBlocked/testUser/789")
  //         .set("Authorization", "Bearer testToken")
  //         .send();

  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body).toEqual({ blocked: false });
  //     });
  //   });
});
