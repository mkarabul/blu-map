const request = require("supertest");
const express = require("express");
const adminRoutes = require("../adminRoutes");

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
app.use("/", adminRoutes);

describe("Admin Routes", () => {
  let createdId;

  test("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST /", async () => {
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send({
        userId: "testUserId",
        email: "testUser@example.com",
        age: 100,
        gender: "Male",
        isSuspended: true,
        isAdmin: true,
        isDarkMode: true,
      });
    expect(response.statusCode).toBe(201);

    createdId = response.body.id;
  });

  test("GET /:id", async () => {
    const response = await request(app).get("/testUserId");
    expect(response.statusCode).toBe(200);
  });

  test("PATCH /:userId/toggle-suspend", async () => {
    const response = await request(app)
      .patch("/testUserId/toggle-suspend")
      .send();
    expect(response.statusCode).toBe(200);
  });

  test("PATCH /:userId/toggle-admin", async () => {
    const response = await request(app)
      .patch("/testUserId/toggle-admin")
      .send();
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete("/testUserId");
    expect(response.statusCode).toBe(200);
  });
});
