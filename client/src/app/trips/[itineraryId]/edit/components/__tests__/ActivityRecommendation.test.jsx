import React from "react";
import { render, screen } from "@testing-library/react";
import ActivityRecommendation from "../ActivityRecommendation";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

describe("ActivityRecommendation", () => {
  it("renders without errors", () => {
    act(() => {
      render(
        <UserProvider>
          <ActivityRecommendation
            addActivity={() => {}}
            defaultStart={0}
            defaultEnd={0}
          />
        </UserProvider>
      );
    });
    expect(screen.getByTestId("activity-recommendation")).toBeInTheDocument();
  });
});
