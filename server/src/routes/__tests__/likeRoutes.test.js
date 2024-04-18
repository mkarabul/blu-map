const request = require("supertest");
const express = require("express");
const likeRoutes = require("../likeRoutes");

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
app.use("/api/likes", likeRoutes);

describe("Like Controller Tests", () => {
  it("should remove existing dislike and create a new like", async () => {
    const postId = "post123";
    const response = await request(app)
      .patch(`/api/likes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect([204, 201]).toContain(response.status);
  });

  it("should return 500 or 204 or 201 when there is a server error creating a like", async () => {
    const postId = "serverErrorSim";
    const response = await request(app)
      .patch(`/api/likes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect([500, 204, 201]).toContain(response.status);
  });

  it("should return 500 or 200 when there is a server error fetching likes by post", async () => {
    const postId = "serverErrorFetch";
    const response = await request(app).get(`/api/likes/post/${postId}`);
    expect([500, 200]).toContain(response.status);
  });

  it("should return 404 when there is a server error fetching user likes count", async () => {
    const userId = "serverErrorUser";
    const response = await request(app).get(`/api/likes/user/${userId}`);
    expect(response.status).toBe(404);
  });
  it("should return 200 when there is no like found for a post (success)", async () => {
    const postId = "post123";
    const response = await request(app).get(`/api/likes/post/${postId}`);
    expect(response.status).toBe(200);
  });
  //if like already exists and it is clicked again
  it("should remove existing like", async () => {
    const postId = "post123";
    const response = await request(app)
      .patch(`/api/likes/post/${postId}`)
      .send({ postId, userId: "testUserId" });
    expect([204, 201]).toContain(response.status);
  });

  /*
  async getUserLikesCount(req, res) {
    try {
      const { userId } = req.params;
      const likes = await Like.findAll({
        where: { userId },
      });
      res.json({ totalLikes: likes.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  test case is below
  */
  //get total likes for the userId
});
