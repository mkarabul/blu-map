const request = require("supertest");
const express = require("express");
const followSystemRoutes = require("../followSystemRoutes");

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
app.use("/", followSystemRoutes);

describe("Follow System Routes Routes", () => {

  test("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST /follow", async () => {
    const response = await request(app)
      .post("/follow")
      .set("Content-Type", "application/json")
      .send({
        userName: "testUser1",
        followingUserName: "testUser2",
      });
    expect(response.statusCode).toBe(201);
  });


  test("GET /followers/:userId", async () => {
    const response = await request(app).get("/followers/testUser1");
    expect(response.statusCode).toBe(200);
  });

  test("GET /following/:userId", async () => {
    const response = await request(app).get("/following/testUser1");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE /unfollow", async () => {
    const response = await request(app)
      .delete("/unfollow")
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


test("POST /follow", async () => {
    const response = await request(app)
            .post("/follow")
            .set("Content-Type", "application/json")
            .send({
            userName: "testUser1",
            notAData: "ssss"
            });
        expect(response.statusCode).toBe(500);
    });


    test("POST /unfollow", async () => {
        const response = await request(app)
            .delete("/unfollow")
            .set("Content-Type", "application/json")
            .send({
            userName: "noUser1",
            followingUserName: "noUser1",
            });
        expect(response.statusCode).toBe(404);
    });
});

