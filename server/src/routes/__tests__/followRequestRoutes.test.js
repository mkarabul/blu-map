const request = require("supertest");
const express = require("express");
const followRequestRoutes = require("../followRequestRoutes");

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
app.use("/", followRequestRoutes);

describe("Follow System Routes Routes", () => {

  test("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST /send-request", async () => {
    const response = await request(app)
      .post("/send-request")
      .set("Content-Type", "application/json")
      .send({
        userName: "testUser1",
        followingUserName: "testUser2",
      });
    expect(response.statusCode).toBe(201);
  });


  test("GET /followers/:userId", async () => {
    const response = await request(app).get("/follower/testUser1");
    expect(response.statusCode).toBe(200);
  });

  test("GET /following/:userId", async () => {
    const response = await request(app).get("/following/testUser2");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /cancel-request", async () => {
    const response = await request(app)
      .delete("/cancel-request")
      .set("Content-Type", "application/json")
      .send({
        userName: "testUser1",
        followingUserName: "testUser2",
      });
    expect(response.statusCode).toBe(200);
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


test("POST /send-request", async () => {
    const response = await request(app)
            .post("/send-request")
            .set("Content-Type", "application/json")
            .send({
            userName: "testUser1",
            notAData: "ssss"
            });
        expect(response.statusCode).toBe(500);
    });


    test("POST /cancel-request", async () => {
        const response = await request(app)
            .delete("/cancel-request")
            .set("Content-Type", "application/json")
            .send({
            userName: "noUser1",
            followingUserName: "noUser1",
            });
        expect(response.statusCode).toBe(404);
    });
});

