import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import LocationRecommendation from "../LocationRecommendation";

import { UserProvider } from "@auth0/nextjs-auth0/client";


jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

global.crypto.randomUUID = jest.fn(() => "1234");
global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue([
        { name: "Activity 1" },
        { name: "Activity 2" },
        { name: "Activity 3" },
    ]),
});

describe("LocationRecommendation", () => {
  it("renders without errors", async () => {
    await act(async () => {
      await render(
        <UserProvider>
          <LocationRecommendation
            loc="New York"
            defaultStart={0}
            defaultEnd={0}
            addActivity={() => {}}
          />
        </UserProvider>
      );
    });

    expect(screen.getByTestId("activity-recommendation")).toBeInTheDocument();
  });
});
