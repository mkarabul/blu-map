const request = require("supertest");
const express = require("express");
const profileTripRoutes = require("../profileTripRoutes");

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
app.use("/", profileTripRoutes);

describe("Profile Trip Routes", () => {
  let createdId;

  test("POST /profile-trips", async () => {
    const profileTrip = {
      userId: "testUserId",
      userName: "testUserName",
      description: "testDescription",
      header: "testHeader",
      tripDate: "2011-10-05T14:48:00.000Z",
      isPublic: true,
    };
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(profileTrip));
    expect(response.statusCode).toBe(201);

    createdId = response.body.uuid;
  });

  test("GET /profile-trips", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("GET /profile-trips/user/:userId", async () => {
    const response = await request(app).get("/user/testUserId");
    expect(response.statusCode).toBe(200);
  });

  test("GET /profile-trips/:id", async () => {
    const response = await request(app).get(`/${createdId}`);
    expect(response.statusCode).toBe(200);
  });
});
