const request = require("supertest");
const express = require("express");
const itineraryRoutes = require("../itineraryRoutes");
const { before } = require("node:test");
const { get } = require("http");

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
app.use("/", itineraryRoutes);

describe("Itinerary Routes", () => {
  let createdId;

  test("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("GET /user/:userId", async () => {
    const response = await request(app).get("/user/testUserId");
    expect(response.statusCode).toBe(200);
  });

  test("POST /", async () => {
    const response = await request(app)
      .post("/")
      .send({ userId: "testUserId" });
    expect(response.statusCode).toBe(201);

    createdId = response.body.uuid;
  });

  test("GET /:id", async () => {
    const response = await request(app).get(`/${createdId}`);
    expect(response.statusCode).toBe(200);
  });

  test("PUT /:id", async () => {
    const response = await request(app).put(`/${createdId}`).send({});
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete(`/${createdId}`);
    expect(response.statusCode).toBe(204);
  });
});

describe("Fail cases Itinerary routes", () => {
  beforeAll(() => {
    jest.mock("../../middleware/authMiddleware", () => ({
      checkJwt: jest.fn((req, res, next) => {
        next();
      }),
      getUserInfoMiddleware: jest.fn((req, res, next) => {
        req.user = undefined;
        next();
      }),
    }));
  });

  test("GET /:id", async () => {
    const response = await request(app).get("/123");
    expect(response.statusCode).toBe(500);
  });

  test("GET /user/:userId", async () => {
    const response = await request(app).get("/user/123");
    expect(response.statusCode).toBe(403);
  });

  test("PUT /:id", async () => {
    const response = await request(app).put("/123").send({});
    expect(response.statusCode).toBe(500);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete("/123");
    expect(response.statusCode).toBe(500);
  });
});
