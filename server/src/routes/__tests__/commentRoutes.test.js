const request = require("supertest");
const express = require("express");
const commentRoutes = require("../commentRoutes");

// jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

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
  findByPk: jest.fn((userId) => {
    return {
      userId: "testUserId",
      userName: "testUserName",
      email: "testEmail",
    };
  }),
}));

const app = express();
app.use(express.json());
app.use("/api/comments", commentRoutes);

describe("Comment Routes", () => {
  let commentId;

  it("should create a comment", async () => {
    const postId = "post123";
    const response = await request(app)
      .post(`/api/comments/post/${postId}`)
      .send({ postId, comment: "test comment", userId: "testCommenterUserId" });

    commentId = response.body.uuid;

    expect(response.status).toBe(201);
  });

  it("should get all comments for a post", async () => {
    const postId = "post123";
    const response = await request(app).get(`/api/comments/post/${postId}`);
    expect(response.status).toBe(200);
  });

  it("should delete a comment", async () => {
    const response = await request(app).delete(`/api/comments/${commentId}`);
    expect(response.status).toBe(200);
  });
});
