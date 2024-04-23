import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { UserProvider } from "@auth0/nextjs-auth0/client";
global.fetch = jest
  .fn()
  .mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });

import CommentSection from "../NewCommentSection";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

global.fetch = jest.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => ({
    userId: "userId",
    comment,
    postId,
    userName: "userName",
  }),
});

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(() => ({
    user: {
      sub: "123",
      name: "userName",
    },
  })),
  UserProvider: ({ children }) => <>{children}</>,
}));

describe("CommentSection", () => {
  it("renders without errors", () => {
    act(() => {
      render(
        <UserProvider>
          <CommentSection postId="postId" />
        </UserProvider>
      );
    });
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
