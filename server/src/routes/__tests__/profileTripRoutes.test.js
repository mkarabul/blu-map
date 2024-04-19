const request = require("supertest");
const express = require("express");
const profileTripRoutes = require("../profileTripRoutes");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testUserId", email: "testUser@example.com" };
    next();
  }),
}));

const app = express();
app.use(express.json());
app.use("/", profileTripRoutes);

describe("Profile Trip Routes", () => {
  let createdTrip;

  test("POST / - Create a profile trip", async () => {
    createdTrip = {
      userId: "mockUserId",
      userName: "mockUserName",
      description: "A mock trip description",
      header: "A mock trip header",
      city: "A mock city",
      country: "A mock country",
      tripDate: "2023-01-01T00:00:00.000Z",
      tripId: uuidv4(),
    };

    const response = await request(app).post("/").send(createdTrip);
    trip = response.body;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("tripId");
    expect(response.body).toHaveProperty("userId", createdTrip.userId);
  });

  test("GET /user/:userId - Get profile trips by current user", async () => {
    const response = await request(app).get("/user/testUserId");
    expect(response.statusCode).toBe(200);
  });

  // test("GET / - Get social profile trips", async () => {
  //   const response = await request(app).get("/");
  //   expect(response.statusCode).toBe(200);
  // });

  test("GET /user/:userId - Get profile trips by user ID", async () => {
    const response = await request(app).get(`/user/${createdTrip.userId}`);
    expect(response.statusCode).toBe(403);
  });

  test("GET /profile-trips/user/:userId", async () => {
    const response = await request(app).get("/user/testUserId");
    expect(response.statusCode).toBe(200);
  });

  test("PUT /user/:userId/switch-mode", async () => {
    const response = await request(app)
      .put(`/user/unauthorized-user-id/switch-mode`)
      .send({ isPublic: true });
    expect(response.statusCode).toBe(200);
  });

  test("GET /public/:userName", async () => {
    const response = await request(app).get(`/public/nonexistent-username`);
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:uuid - Delete a profile trip", async () => {
    const response = await request(app).delete(`/${trip.uuid}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("Fail Cases Profile Trip Routes", () => {
  // test("GET /profile-trips/:id", async () => {
  //   const response = await request(app).get("/123");
  //   expect(response.statusCode).toBe(500);
  // });
  test("GET /profile-trips/user/:userId", async () => {
    const response = await request(app).get("/user/123");
    expect(response.statusCode).toBe(403);
  });
  test("POST /profile-trips", async () => {
    const response = await request(app).post("/");
    expect(response.statusCode).toBe(500);
  });
  test("GET /profile-trips/social", async () => {
    const response = await request(app).get("/social");
    expect(response.statusCode).toBe(500);
  });
  test("POST / - Fail to create a profile trip without required fields", async () => {
    const incompleteData = {
      userName: "mockUserName",
      description: "A mock trip description",
    };
    const response = await request(app).post("/").send(incompleteData);
    expect(response.statusCode).toBe(500);
  });
  test("GET /:tripId/images - Fail to retrieve trip images with invalid tripId", async () => {
    const response = await request(app).get(`/invalid-trip-id/images`);
    expect(response.statusCode).toBe(500);
  });
  test("GET /:uuid - Fail to get trip by invalid UUID", async () => {
    const response = await request(app).get(`/invalid-uuid`);
    expect(response.statusCode).toBe(500);
  });
  test("GET /user/:userId - Fail to get profile trips with unauthorized user ID", async () => {
    const response = await request(app).get(`/user/unauthorized-user-id`);
    expect(response.statusCode).toBe(403);
  });
});
describe("Profile Trip Routes - Additional Fail Cases", () => {
  test("POST / - Fail to create a profile trip without required fields", async () => {
    const incompleteData = {
      userName: "mockUserName",
      description: "A mock trip description",
    };
    const response = await request(app).post("/").send(incompleteData);
    expect(response.statusCode).toBe(500);
  });
  test("GET /:tripId/images - Fail to retrieve trip images with invalid tripId", async () => {
    const response = await request(app).get(`/invalid-trip-id/images`);
    expect(response.statusCode).toBe(500);
  });
  test("GET /:uuid - Fail to get trip by invalid UUID", async () => {
    const response = await request(app).get(`/invalid-uuid`);
    expect(response.statusCode).toBe(500);
  });
  test("GET /user/:userId - Fail to get profile trips with unauthorized user ID", async () => {
    const response = await request(app).get(`/user/unauthorized-user-id`);
    expect(response.statusCode).toBe(403);
  });
  test("PATCH /:uuid/toggle-public - Fail to toggle public state with invalid UUID", async () => {
    const response = await request(app).patch(`/invalid-uuid/toggle-public`);
    expect(response.statusCode).toBe(500);
  });
  // test("PATCH /:uuid/increment-likes - Fail to increment likes with invalid UUID", async () => {
  //   const response = await request(app).patch(`/invalid-uuid/increment-likes`);
  //   expect(response.statusCode).toBe(500);
  // });
  // test("PATCH /:uuid/increment-dislikes - Fail to increment dislikes with invalid UUID", async () => {
  //   const response = await request(app).patch(
  //     `/invalid-uuid/increment-dislikes`
  //   );
  //   expect(response.statusCode).toBe(500);
  // });
});
