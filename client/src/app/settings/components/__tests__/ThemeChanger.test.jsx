import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import ThemeChanger from "../ThemeChanger";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeChanger", () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { sub: "user123" } });
    useTheme.mockReturnValue({
      theme: "dark",
      setTheme: jest.fn(),
    });
  });

  it("renders the toggle text", () => {
    render(<ThemeChanger />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });
});
