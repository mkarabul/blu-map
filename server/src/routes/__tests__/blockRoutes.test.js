// const request = require("supertest");
// const express = require("express");
// const blockRoutes = require("../blockRoutes");

// jest.mock("../../middleware/authMiddleware", () => ({
//   checkJwt: jest.fn((req, res, next) => {
//     next();
//   }),
//   getUserInfoMiddleware: jest.fn((req, res, next) => {
//     req.user = { sub: "testUserId" };
//     next();
//   }),
// }));

// const app = express();
// app.use(express.json());
// app.use("/", blockRoutes);

// describe("Block System Routes", () => {
//   test("GET /", async () => {
//     const response = await request(app).get("/");
//     expect(response.statusCode).toBe(200);
//   });

//   test("POST /block", async () => {
//     const response = await request(app)
//       .post("/block")
//       .set("Content-Type", "application/json")
//       .send({
//         userName: "testUser1",
//         blockedUserName: "testUser2",
//       });
//     expect(response.statusCode).toBe(201);
//   });

//   test("GET /blocked/:userId", async () => {
//     const response = await request(app).get("/blocked/testUser1");
//     expect(response.statusCode).toBe(200);
//   });

//   test("GET /blocking/:userId", async () => {
//     const response = await request(app).get("/blocking/testUser2");
//     expect(response.statusCode).toBe(200);
//   });

//   test("DELETE /unblock", async () => {
//     const response = await request(app)
//       .delete("/unblock")
//       .set("Content-Type", "application/json")
//       .send({
//         userName: "testUser1",
//         blockedUserName: "testUser2",
//       });
//     expect(response.statusCode).toBe(200);
//   });
// });
