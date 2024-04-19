const request = require("supertest");
const express = require("express");
const reportRoutes = require("../reportRoutes");

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
app.use("/", reportRoutes);

describe("Report Routes", () => {
  let createdId;

  test("POST /", async () => {
    const report = {
      reporterUserID: "userID1",
      reportedUserName: "userID2",
      header: "Violation Report",
      description: "Description.",
      reportType: "Conduct Issue",
    };
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(report));
    expect(response.statusCode).toBe(201);
    createdId = response.body.report.reportId;
  });
  test("GET /:reportId", async () => {
    const response = await request(app).get(`/${createdId}`);
    expect(response.statusCode).toBe(200);
  });
  test("GET /all/:reportedUserName", async () => {
    const response = await request(app).get(`/all/userID2`);
    expect(response.statusCode).toBe(200);
  });

  test("GET /", async () => {
    const response = await request(app).get(`/`);
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:reportid", async () => {
    const response = await request(app)
      .delete(`/${createdId}`)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
  });
});

describe("Fail Cases Profile Trip Routes", () => {
  test("POST /", async () => {
    const report = {
      reporterUserID: "userID1",
      reportedUserName: "userID2",
      header: "Violation Report",
      description: "Description.",
      error: "error",
    };
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(report));
    expect(response.statusCode).toBe(500);
  });

  test("GET /:reportId", async () => {
    const response = await request(app).get(`/assdfasdf`);
    expect(response.statusCode).toBe(500);
  });

  test("GET /all/:reportedUserName", async () => {
    const response = await request(app).get(`/all/asdfasdfasdf`);
    expect(response.statusCode).toBe(200);
  });

  test("GET /", async () => {
    const response = await request(app).get(`/a`);
    expect(response.statusCode).toBe(500);
  });

  test("DELETE /:reportid", async () => {
    const response = await request(app)
      .delete(`/alsdfasdf`)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(500);
  });
});
