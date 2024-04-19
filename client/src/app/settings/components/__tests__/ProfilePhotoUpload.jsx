import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePhotoUpload from "../ProfilePhotoUpload";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@testing-library/jest-dom";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

describe("ProfilePhotoUpload", () => {
  it("renders the component without crashing", () => {
    render(
      <UserProvider>
        <ProfilePhotoUpload refresh={0} setRefresh={() => {}} />
      </UserProvider>
    );
    expect(screen.getByText("Change Photo")).toBeInTheDocument();
  });
});
