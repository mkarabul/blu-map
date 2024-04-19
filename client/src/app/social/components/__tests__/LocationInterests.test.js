import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationInterests from "../LocationInterests";
import "@testing-library/jest-dom";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

describe("LocationInterests", () => {
  const mockPosts = [
    { country: "Germany", city: "Berlin" },
    { country: "Germany", city: "Munich" },
    { country: "France", city: "Paris" },
  ];

  const setup = (posts = mockPosts) => {
    const setLocationFilter = jest.fn();
    const setLocationInterests = jest.fn();
    const setCheckedCities = jest.fn();
    render(
      <LocationInterests
        posts={posts}
        setLocationFilter={setLocationFilter}
        locationInterests={{ Germany: ["Berlin", "Munich"], France: ["Paris"] }}
        setLocationInterests={setLocationInterests}
        checkedCities={["Berlin"]}
        setCheckedCities={setCheckedCities}
      />
    );
    return {
      setLocationFilter,
      setLocationInterests,
      setCheckedCities,
    };
  };

  it("renders location interests based on posts", () => {
    setup();
    expect(screen.getByRole("button", { name: /Berlin/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Munich/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Paris/ })).toBeInTheDocument();
  });

  it("handles posts with unknown city or country", () => {
    const postsWithUnknown = [
      { country: "Unknown", city: "SomeCity" },
      { country: "Germany", city: "Unknown" },
    ];
    const { setLocationInterests } = setup(postsWithUnknown);
    expect(setLocationInterests).toHaveBeenCalledWith({});
  });
});
