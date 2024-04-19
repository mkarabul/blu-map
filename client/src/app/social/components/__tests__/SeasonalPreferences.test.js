import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SeasonalPreferences from "../SeasonalPreferences";
import "@testing-library/jest-dom";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

describe("SeasonalPreferences", () => {
  const mockSetSeasonFilter = jest.fn();
  const mockSetCheckedSeasons = jest.fn();

  beforeEach(() => {
    render(
      <SeasonalPreferences
        posts={[]}
        setSeasonFilter={mockSetSeasonFilter}
        checkedSeasons={[]}
        setCheckedSeasons={mockSetCheckedSeasons}
      />
    );
  });

  it("renders all season buttons with months", () => {
    const seasons = ["Spring", "Summer", "Autumn", "Winter"];
    seasons.forEach((season) => {
      expect(screen.getByText(season)).toBeInTheDocument();
    });

    ["March", "June", "September", "December"].forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });

  it("updates season filter when checked seasons change", () => {
    render(
      <SeasonalPreferences
        posts={[]}
        setSeasonFilter={mockSetSeasonFilter}
        checkedSeasons={["March"]}
        setCheckedSeasons={mockSetCheckedSeasons}
      />
    );

    expect(mockSetSeasonFilter).toHaveBeenCalledWith({ March: true });
  });
});
