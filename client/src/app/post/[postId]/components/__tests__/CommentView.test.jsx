import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import CommentView from "../CommentView";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(() => ({ user: { sub: "123" } })),
  UserProvider: jest.fn(({ children }) => <>{children}</>),
}));

describe("CommentView", () => {
  it("renders the comment text", () => {
    const userName = "testUser";
    const commentText = "This is a test comment";

    act(() => {
      render(
        <UserProvider>
          <CommentView userName={userName} comment={commentText} />
        </UserProvider>
      );
    });

    expect(screen.getByText(`${userName}`)).toBeInTheDocument();

    expect(screen.getByText(`: ${commentText}`)).toBeInTheDocument();
  });

  it("renders the delete button when user is admin", async () => {
    const commentText = "This is a test comment";

    window.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ isAdmin: true }),
    });

    act(() => {
      render(
        <UserProvider>
          <CommentView comment={commentText} />
        </UserProvider>
      );
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it("does not render the delete button when user is not admin", () => {
    const commentText = "This is a test comment";

    act(() => {
      render(
        <UserProvider>
          <CommentView comment={commentText} />
        </UserProvider>
      );
    });

    expect(screen.queryByRole("button")).toBeNull();
  });
});
