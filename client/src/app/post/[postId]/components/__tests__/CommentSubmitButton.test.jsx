import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import CommentSection from "../CommentSection";

describe("CommentSection", () => {
  it("renders without errors", () => {
    act(() => {
      render(<CommentSection postId="postId" />);
    });
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

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
      render(<CommentSection postId={postId} />);
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
});
