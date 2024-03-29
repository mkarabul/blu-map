const request = require("supertest");
const express = require("express");
const likeRoutes = require("../likeRoutes");

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
app.use("/api/likes", likeRoutes);

describe("Like Routes", () => {
  it("should like a post code 201", async () => {
    const postId = "post123";
    const response = await request(app)
      .patch(`/api/likes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect(response.status).toBe(201);
  });

  // it("should like a post code 204", async () => {
  //   const postId = "post123";
  //   const response = await request(app)
  //     .patch(`/api/likes/post/${postId}`)
  //     .send({ postId, userId: "testUserId" });
  //   expect(response.status).toBe(204);
  // });

  it("should get all likes for a post", async () => {
    const postId = "post123";
    const response = await request(app).get(`/api/likes/post/${postId}`);
    expect(response.status).toBe(200);
  });
});

describe("Branch Coverage for Like Routes", () => {
  it("should handle failure when trying to like a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).patch(`/likes/post/${postId}`);
    expect(response.status).toBe(404);
  });
  it("should handle failure when trying to get likes for a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).get(`/likes/post/${postId}`);
    expect(response.status).toBe(404);
  });
  it("should handle internal server error when trying to like a post", async () => {
    const postId = "postCausingServerError";
    const response = await request(app).patch(`/api/likes/post/${postId}`);
    expect(response.status).toBe(500);
  });
  it("should handle failure when trying to like a post that doesn't exist", async () => {
    const postId = "nonExistentPost";
    const response = await request(app).patch(`/likes/post/${postId}`);
    expect(response.status).toBe(404);
  });
});
