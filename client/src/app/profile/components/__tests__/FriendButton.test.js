import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FriendButton from "../FriendButton";
import { useUser } from "@auth0/nextjs-auth0/client";

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

describe("FriendButton", () => {
  const userName = "testuser";
  const userSub = "auth0|123456";

  beforeEach(() => {
    useUser.mockReturnValue({ user: { sub: userSub } });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  it("renders the Add Friend button by default", () => {
    render(<FriendButton userName={userName} />);
    expect(
      screen.getByRole("button", { name: "Add Friend" })
    ).toBeInTheDocument();
  });

  it("sends a friend request when Add Friend button is clicked", async () => {
    const user = userEvent.setup();
    render(<FriendButton userName={userName} />);

    await user.click(screen.getByRole("button", { name: "Add Friend" }));

    expect(fetch).toHaveBeenCalledWith(`/api/friend/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userSub }),
    });
  });
});
