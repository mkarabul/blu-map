const request = require("supertest");
const express = require("express");
const userRoutes = require("../userRoutes");

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
app.use("/", userRoutes);

describe("User Routes", () => {
  let createdId;

  test("GET /users", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST /users", async () => {
    const response = await request(app).post("/").send();
    expect(response.statusCode).toBe(201);

    createdId = response.body.id;
  });

  test("GET /users/:userId", async () => {
    const response = await request(app).get("/testUserId");
    expect(response.statusCode).toBe(200);
  });

  test("PUT /users/:id", async () => {
    const response = await request(app)
      .put("/testUserId")
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          userNameNew: "newTestUserName",
          genderNew: "newGender",
          ageNew: 100,
        })
      );
    expect(response.statusCode).toBe(200);
  });

  test("PATCH /users/:userId/toggle-suspend", async () => {
    const response = await request(app).patch("/testUserId/toggle-suspend");
    expect(response.statusCode).toBe(200);
  });

  test("PATCH /users/:userId/toggle-admin", async () => {
    const response = await request(app).patch("/testUserId/toggle-admin");
    expect(response.statusCode).toBe(200);
  });

  test("PATCH /users/:userId/toggle-darkmode", async () => {
    const response = await request(app).patch("/testUserId/toggle-darkmode");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /users/:userId", async () => {
    const response = await request(app).delete("/testUserId");
    expect(response.statusCode).toBe(200);
  });
});
