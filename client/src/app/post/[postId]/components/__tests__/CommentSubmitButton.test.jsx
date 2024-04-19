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

import { UserProvider } from "@auth0/nextjs-auth0/client";

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
<<<<<<< HEAD

  it("should submit comment when the submit button is clicked", async () => {
    const postId = "postId";
    const comment = "This is a test comment";

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        userId: "userId",
        comment,
        postId,
        userName: "userName",
      }),
    });

    act(() => {
      render(
        <UserProvider>
          <CommentSection postId={postId} />
        </UserProvider>
      );
    });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    const commentTextArea = screen.getByPlaceholderText(
      /type your comment here/i
    );

    await act(async () => {
      await userEvent.type(commentTextArea, comment);
      await userEvent.click(submitButton);
    });

    expect(global.fetch).toHaveBeenCalledWith(`/api/comments/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "", comment, postId, userName: "" }),
    });

    expect(screen.getByText(comment)).toBeInTheDocument();
  });
=======
>>>>>>> bafea5a7fefb779c0d6f2ee376b7391aef353fad
});
