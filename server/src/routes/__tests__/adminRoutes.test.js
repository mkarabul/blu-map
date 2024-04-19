const request = require("supertest");
const express = require("express");
const adminRoutes = require("../adminRoutes");

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("../../middleware/authMiddleware", () => ({
  checkJwt: jest.fn((req, res, next) => {
    next();
  }),
  getUserInfoMiddleware: jest.fn((req, res, next) => {
    req.user = { sub: "testAdmin" };
    next();
  }),
}));

const app = express();
app.use(express.json());
app.use("/", adminRoutes);

describe("Admin Routes", () => {
  let createdId;
  let createdIdNotification;

  test("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST /", async () => {
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send({
        userId: "testAdmin",
        email: "testAdmin@example.com",
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
    const response = await request(app).get("/testAdmin");
    expect(response.statusCode).toBe(200);
  });

  // test("PATCH /:userId/toggle-suspend", async () => {
  //   const response = await request(app)
  //     .patch("/testAdmin/toggle-suspend")
  //     .send();
  //   expect(response.statusCode).toBe(200);
  // });

  test("PATCH /:userId/toggle-admin", async () => {
    const response = await request(app).patch("/testAdmin/toggle-admin").send();
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete("/testAdmin");
    expect(response.statusCode).toBe(200);
  });
  test("POST /notifications/post", async () => {
    const notificationBody = {
      userId: "auth0|65dcfb3961353d011b2a43e5",
      header: "yo whats good",
      description:
        "nahsdfadsfd This is a detailasdfaah of the violation orasdhgasdfasdf issue being reported.",
    };

    const response = await request(app)
      .post("/notifications/post")
      .set("Content-Type", "application/json")
      .send(notificationBody);
    console.log(response.body);

    createdIdNotification = response.body.notification.Id;
    expect(response.statusCode).toBe(201);
  });
<<<<<<< HEAD

  test("GET /notifications/get", async () => {
    const response = await request(app).get("/notifications/get");
    expect(response.statusCode).toBe(200);
  });

  test("GET /notifications/get/userID", async () => {
    const response = await request(app).get("/notifications/get/auth0|65dcfb3961353d011b2a43e5");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /notifications/delete/:notificationId", async () => {
    console.log(createdIdNotification);
    const response = await request(app).delete(`/notifications/delete/${createdIdNotification}`);
    expect(response.statusCode).toBe(200);
  });
  



=======
>>>>>>> 3d547a31ba6f9b608da082290cb7e46fa7ddfcae
});

describe("Fail Cases Admin Routes", () => {
  test("GET /:id", async () => {
    const response = await request(app).get("/testAdmin");
    expect(response.statusCode).toBe(404);
  });

  test("PATCH /:userId/toggle-suspend", async () => {
    const response = await request(app)
      .patch("/testAdmin/toggle-suspend")
      .send();
    expect(response.statusCode).toBe(404);
  });

  test("PATCH /:userId/toggle-admin", async () => {
    const response = await request(app).patch("/testAdmin/toggle-admin").send();
    expect(response.statusCode).toBe(500);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete("/testAdmin");
    expect(response.statusCode).toBe(404);
  });

  test("POST /", async () => {
    const response = await request(app)
      .post("/")
      .set("Content-Type", "application/json")
      .send();
    expect(response.statusCode).toBe(400);
  });
});
