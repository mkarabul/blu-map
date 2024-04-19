const request = require("supertest");
const express = require("express");
const placesRoutes = require("../placesRoutes");

const client = require("../../config/googleMapsClient");

const app = express();
app.use("/", placesRoutes);

jest.mock("../../config/googleMapsClient", () => {
  return {
    placesNearby: jest.fn().mockResolvedValue({
      data: {
        results: [
          {
            name: "Eiffel Tower",
            rating: 4.7,
            vicinity: "Champ de Mars, 5 Avenue Anatole, Paris",
          },
        ],
      },
    }),
  };
});

jest.mock("../../config/cache", () => {
  return {
    get: jest.fn(),
    set: jest.fn(),
  };
});

describe("Places Routes", () => {
  it("should return a list of places", async () => {
    const response = await request(app).get("?location=Paris");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        name: "Eiffel Tower",
        rating: 4.7,
        vicinity: "Champ de Mars, 5 Avenue Anatole, Paris",
      },
    ]);
  });

  it("should return an error if location is not provided", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Location is required" });
  });
});
