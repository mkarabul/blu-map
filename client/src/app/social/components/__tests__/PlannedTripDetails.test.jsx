import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlannedTripDetails from "../PlannedTripDetails";
import "@testing-library/jest-dom";
import { useUser } from "@auth0/nextjs-auth0/client";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

global.fetch = jest.fn();

const mockMapping = {
  US: "United States",
  DE: "Germany",
};

jest.mock("../../../trips/components/CountryMapping", () => ({
  mapping: mockMapping,
}));

describe("PlannedTripDetails", () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { sub: "user123" } });
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        city: "Berlin, DE",
        updatedAt: new Date().toISOString(),
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without a user and does not display the button", () => {
    useUser.mockReturnValue({ user: null });

    render(<PlannedTripDetails />);
    expect(
      screen.queryByText("Get Trip Recommendations According to Planned Trip")
    ).not.toBeInTheDocument();
  });

  it("expands and fetches trip details when the button is clicked", async () => {
    render(
      <PlannedTripDetails
        locationInterests={{ Germany: ["Berlin"] }}
        setCheckedCities={jest.fn()}
        setLocationFilter={jest.fn()}
        setSeasonFilter={jest.fn()}
        setCheckedSeasons={jest.fn()}
      />
    );

    const button = screen.getByText(
      "Get Trip Recommendations According to Planned Trip"
    );
    expect(button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/itineraries/user123/last-itinerary-details"
      );
      expect(screen.getByText("Month:")).toBeInTheDocument();
      expect(screen.getByText("City: Berlin, DE")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully", async () => {
    fetch.mockRejectedValue(new Error("Failed to fetch"));

    render(
      <PlannedTripDetails
        locationInterests={{}}
        setCheckedCities={jest.fn()}
        setLocationFilter={jest.fn()}
        setSeasonFilter={jest.fn()}
        setCheckedSeasons={jest.fn()}
      />
    );

    const button = screen.getByText(
      "Get Trip Recommendations According to Planned Trip"
    );
    await act(async () => {
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByText("City:")).not.toBeInTheDocument();
    });
  });
});
