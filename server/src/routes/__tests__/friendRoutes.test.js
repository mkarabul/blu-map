const request = require("supertest");
const express = require("express");
const friendRoutes = require("../friendRoutes");

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
app.use("/", friendRoutes);

describe("Friend Routes - Success Cases", () => {
  test("GET /:userId/friends - Get user's friends", async () => {
    const response = await request(app).get("/testUserId/friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /:userName/:userId/is-friend - Check if users are friends", async () => {
    const response = await request(app).get(
      "/testUserName/testUserId/is-friend"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isFriend");
  });

  test("GET /:userId/pending-friends - Get user's pending friend requests", async () => {
    const response = await request(app).get("/testUserId/pending-friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /:userId/friends - Validate response content", async () => {
    const response = await request(app).get("/testUserId/friends");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Friend Routes - Not Found Cases", () => {
  test("PATCH /:userName/accept-friend - Accept a non-existing friend request", async () => {
    const response = await request(app)
      .patch("/testUserName/accept-friend")
      .send({ userId: "testUserId" });
    expect(response.statusCode).toBe(404);
  });

  test("PATCH /:userName/reject-friend - Reject a non-existing friend request", async () => {
    const response = await request(app)
      .patch("/testUserName/reject-friend")
      .send({ userId: "testUserId" });
    expect(response.statusCode).toBe(404);
  });

  test("DELETE /:userName - Delete a non-existing friend", async () => {
    const response = await request(app)
      .delete("/nonExistingUserName")
      .send({ userId: "testUserId" });
    expect(response.statusCode).toBe(404);
  });

  test("Successfully get all active friends", async () => {
    const response = await request(app).get("/active-friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Successfully get all pending friends", async () => {
    const response = await request(app).get("/pending-friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Friend Routes - Fail Cases", () => {
  test("POST /:userName - Send a friend request with server error", async () => {
    const response = await request(app)
      .post("/someUserName")
      .send({ userId: "someUserId" });
    expect(response.statusCode).toBe(500);
  });

  test("POST /:userName - Send a friend request with invalid input", async () => {
    const response = await request(app).post("/validUserName").send({});
    expect(response.statusCode).toBe(500);
  });

  test("POST /:userName - User sends a friend request to themselves", async () => {
    const response = await request(app)
      .post("/testUserName")
      .send({ userId: "testUserId" });
    expect(response.statusCode).toBe(500);
  });
});
