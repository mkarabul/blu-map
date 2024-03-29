const request = require("supertest");
const express = require("express");
const friendRoutes = require("../friendRoutes");
const userRoutes = require("../userRoutes");
const User = require("../../models/User");

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

const users = [
  {
    userId: "testUserId1",
    userName: "testUserName1",
    accessToken: "test1",
    email: "test1@email.com",
  },
  {
    userId: "testUserId2",
    userName: "testUserName2",
    accessToken: "test2",
    email: "test2@email.com",
  },
];

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    if (req.headers.Authorization === "test1") {
      req.user = {
        sub: "testUserId1",
        userName: "testUserName1",
        accessToken: "test1",
        email: "testuser1@mail.com",
      };
    } else {
      req.user = {
        sub: "testUserId2",
        userName: "testUserName2",
        accessToken: "test2",
        email: "testuser2@mail.com",
      };
    }
    next();
  }),
}));

const app = express();
app.use(express.json());
app.use("/", friendRoutes);
app.use("/api/users", userRoutes);

describe("Friend Routes - Success Cases", () => {
  beforeAll(async () => {
    const user1 = await User.create({
      userId: users[0].userId,
      email: users[0].email,
      userName: users[0].userName,
    });
    const user2 = await User.create({
      userId: users[1].userId,
      email: users[1].email,
      userName: users[1].userName,
    });
  });

  afterAll(async () => {
    await User.destroy({
      where: {
        userId: users[0].userId,
      },
    });

    await User.destroy({
      where: {
        userId: users[1].userId,
      },
    });
  });

  test("POST /:userName - Send a successful friend request", async () => {
    const response = await request(app)
      .post("/testUserName2")
      .send({ userId: "testUserId1" });
    expect(response.statusCode).toBe(201);
  });

  test("PATCH /:userName/reject-friend - Reject a friend request", async () => {
    const response = await request(app)
      .patch("/testUserName1/reject-friend")
      .send({ userId: "testUserId2" });
    expect(response.statusCode).toBe(200);
  });

  test("POST /:userName - Send a successful friend request", async () => {
    const response = await request(app)
      .post("/testUserName2")
      .send({ userId: "testUserId1" });
    expect(response.statusCode).toBe(201);
  });

  test("PATCH /:userName/accept-friend - Accept a friend request", async () => {
    const response = await request(app)
      .patch("/testUserName1/accept-friend")
      .send({ userId: "testUserId2" });
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:userName - Delete a friend", async () => {
    const response = await request(app)
      .delete("/testUserName1")
      .send({ userId: "testUserId2" });
    expect(response.statusCode).toBe(200);
  });

  test("GET /:userId/friends - Get user's friends", async () => {
    const response = await request(app).get("/testUserId1/friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /:userName/:userId/is-friend - Check if users are friends", async () => {
    const response = await request(app).get(
      "/testUserName/testUserId1/is-friend"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isFriend");
  });

  test("GET /:userId/pending-friends - Get user's pending friend requests", async () => {
    const response = await request(app).get("/testUserId1/pending-friends");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /:userId/friends - Validate response content", async () => {
    const response = await request(app).get("/testUserId1/friends");
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
