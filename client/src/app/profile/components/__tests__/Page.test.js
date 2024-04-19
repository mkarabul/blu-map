import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../../page"; 
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { act } from "react-dom/test-utils";


jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(() => ({ user: { sub: "123" } })),
  UserProvider: ({ children }) => <>{children}</>,
}));

describe("Page Component", () => {
  it("renders without crashing", () => {
    act(() => {
    render(
        <UserProvider>
            <Page />
        </UserProvider>
        );
    });
  
    
  });

});
