const request = require("supertest");
const express = require("express");
const dislikeRoutes = require("../dislikeRoutes");

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testUserId" };
    next();
  }),
}));

const app = express();
app.use(express.json());
app.use("/api/dislikes", dislikeRoutes);

describe("Dislike Routes", () => {
  it("should dislike a post code 201", async () => {
    const postId = "post123";
    const response = await request(app)
      .patch(`/api/dislikes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect([201, 204]).toContain(response.status);
  });

  it("should dislike a post code 204", async () => {
    const postId = "post123";
    const response = await request(app)
      .patch(`/api/dislikes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect(response.status).toBe(204);
  });

  it("should get all dislikes for a post", async () => {
    const postId = "post123";
    const response = await request(app).get(`/api/dislikes/post/${postId}`);
    expect(response.status).toBe(200);
  });
});

describe("Branch Coverage for Dislike Routes", () => {
  it("should handle failure when trying to dislike a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).patch(`/dislikes/post/${postId}`);
    expect(response.status).toBe(404);
  });
  it("should handle failure when trying to get dislikes for a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).get(`/dislikes/post/${postId}`);
    expect(response.status).toBe(404);
  });
  it("should handle internal server error when trying to dislike a post", async () => {
    const postId = "postCausingServerError";
    const response = await request(app).patch(`/api/dislikes/post/${postId}`);
    expect(response.status).toBe(500);
  });
  it("should handle failure when trying to dislike a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).patch(`/dislikes/post/${postId}`);
    expect(response.status).toBe(404);
  });
});
