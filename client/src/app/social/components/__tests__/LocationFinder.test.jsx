import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import LocationFinder from "../LocationFinder";
import "@testing-library/jest-dom";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

global.fetch = jest.fn();

describe("LocationFinder", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        success({
          coords: { latitude: 40.712776, longitude: -74.005974 },
        });
      }),
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ cities: ["City1"] }),
    });
  });

  it("renders without errors", async () => {
    await act(async () => {
      render(
        <LocationFinder
          locationInterests={{}}
          setCheckedCities={() => {}}
          setLocationFilter={() => {}}
        />
      );
    });
    expect(
      screen.getByText("Get Recommendations for Current Location")
    ).toBeInTheDocument();
  });

  it("processes fetched data correctly", async () => {
    const setCheckedCities = jest.fn();
    const setLocationFilter = jest.fn();
    const user = userEvent.setup();

    await act(async () => {
      render(
        <LocationFinder
          locationInterests={{ 1: ["City1"] }}
          setCheckedCities={setCheckedCities}
          setLocationFilter={setLocationFilter}
        />
      );
      await user.click(screen.getByRole("button"));
    });

    await waitFor(() => {
      expect(screen.getByText("Nearby Cities:")).toBeInTheDocument();
      expect(screen.getByText("City1")).toBeInTheDocument();
      expect(setCheckedCities).toHaveBeenCalledWith(["City1"]);
      expect(setLocationFilter).toHaveBeenCalledWith({
        City1: true,
      });
    });
  });
});
