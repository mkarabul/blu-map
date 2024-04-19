import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import CommentDeleteButton from "../CommentDeleteButton";

describe("CommentDeleteButton", () => {
  it("renders without errors", () => {
    act(() => {
      render(<CommentDeleteButton deleteComment={() => {}} uuid="123" />);
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call deleteComment when clicked", async () => {
    const deleteCommentMock = jest.fn();
    const uuid = "123";
    const user = await userEvent.setup();

    act(() => {
      render(
        <CommentDeleteButton deleteComment={deleteCommentMock} uuid={uuid} />
      );
    });

    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });

    expect(deleteCommentMock).toHaveBeenCalledWith(uuid);
  });
});
