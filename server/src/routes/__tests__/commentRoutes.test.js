const request = require("supertest");
const express = require("express");
const commentRoutes = require("../commentRoutes");

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
app.use("/api/comments", commentRoutes);

describe("Comment Routes", () => {
  it("should get all comments for a post", async () => {
    const postId = "post123";
    const response = await request(app).get(`/api/comments/post/${postId}`);
    expect(response.status).toBe(200);
  });
});

describe("Comment Routes Error Handling", () => {
  it("should return 500 if error occurs while creating a comment", async () => {
    const postId = "post123";
    const response = await request(app)
      .post(`/api/comments/post/${postId}`)
      .send({ postId, comment: "test comment", userId: "testUserId" });
    expect(response.status).toBe(500);
  });
});

describe("Comment Routes Error Handling", () => {
  it("should return 500 if error occurs while deleting a comment", async () => {
    const uuid = "comment123";
    const response = await request(app).delete(`/api/comments/${uuid}`);
    expect(response.status).toBe(500);
  });
});
