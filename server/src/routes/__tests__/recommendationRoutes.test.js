const request = require("supertest");
const express = require("express");
const recommendationRoutes = require("../recommendationRoutes");

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testUserId" };
    next();
  }),
}));

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());


const app = express();
app.use(express.json());
app.use("/", recommendationRoutes);

describe("Recommendation Routes", () => {
  it("should get all recommendations", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("should create a recommendation", async () => {
    const userId = "user123";
    const activity = "hiking";
    const response = await request(app).post(`/${userId}/${activity}`);
    expect(response.status).toBe(201);
  });

  it("should get user recommendations", async () => {
    const userId = "user123";
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
  });

  it("should delete a recommendation", async () => {
    const userId = "user123";
    const activity = "hiking";
    const response = await request(app).delete(`/${userId}/${activity}`);
    expect(response.status).toBe(200);
  });
});

describe("Fail Cases Recommendation Routes", () => {
  it("should fail to delete a recommendation", async () => {
    const userId = "failUser123";
    const activity = "hiking";
    const response = await request(app).delete(`/${userId}/${activity}`);
    expect(response.status).toBe(404);
  });

  it("should fail to create a recommendation", async () => {
    const userId = "failUser123";
    const activity = "hiking";

    await request(app).post(`/${userId}/${activity}`);

    const response = await request(app).post(`/${userId}/${activity}`);
    expect(response.status).toBe(400);
    
    await request(app).delete(`/${userId}/${activity}`);
  });
});
