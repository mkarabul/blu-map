const request = require("supertest");
const express = require("express");
const notificationRoutes = require("../notificationRoutes");

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

const app = express();
app.use(express.json());
app.use("/notifications", notificationRoutes);

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testUserId" };
    next();
  }),
}));

describe("Notification Routes - Success Cases", () => {
  let newNotification;
  test("POST /:userId - Create a notification successfully", async () => {
    const response = await request(app)
      .post("/notifications/1")
      .send({ hour: 10, minute: 30 });

    newNotification = response.body;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe("1");
    expect(response.body.hour).toBe(10);
    expect(response.body.minute).toBe(30);
  });

  test("GET /:userId - Retrieve notifications successfully", async () => {
    const response = await request(app).get("/notifications/1");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /get-all/:userId - Retrieve all notifications successfully", async () => {
    const response = await request(app).get("/notifications/get-all/1");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("DELETE /:id - Delete a notification successfully", async () => {
    const response = await request(app).delete(
      `/notifications/${newNotification.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Notification deleted");
  });
});

describe("Notification Routes - Failure Cases", () => {
  test("POST /:userId - Fail to create a notification with invalid data", async () => {
    const response = await request(app)
      .post("/notifications/1")
      .send({ hour: 25, minute: 60 });

    expect(response.statusCode).toBe(500);
  });

  test("DELETE /:id - Fail to delete a notification with invalid id", async () => {
    const response = await request(app).delete("/notifications/invalidId");
    expect(response.statusCode).toBe(500);
  });
});
