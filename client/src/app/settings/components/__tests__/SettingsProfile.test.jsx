import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Profile from "../SettingsProfile";
import { UserProvider } from "@auth0/nextjs-auth0/client";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

global.fetch = jest
  .fn()
  .mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });

describe("Profile Component", () => {
  it("should render without crashing", () => {
    render(
      <UserProvider>
        <Profile refresh={false} />
      </UserProvider>
    );
  });
});
