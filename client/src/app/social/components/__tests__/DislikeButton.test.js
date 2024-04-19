import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import SocialPost from "../SocialPost";
import { UserProvider } from "@auth0/nextjs-auth0/client";

jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    };
  },
}));

global.fetch = jest.fn().mockReturnValue({
  json: jest.fn().mockResolvedValue([{ uuid: "123" }]),
});

describe("SocialPost", () => {
  it("increments dislike count when dislike button is clicked", async () => {
    // Mock initial dislike count and postId
    const initialDislikes = 5;
    const postId = "postId";

    // Render the SocialPost component
    await act(async () => {
      await render(
        <UserProvider>
          <SocialPost
            uuid={postId}
            header="Test Header"
            description="Test Description"
            tripDate="2024-03-29"
            userName="TestUser"
            likes={0}
            dislikes={initialDislikes}
            tripId="tripId"
            clickable={true}
            images={[]}
          />
        </UserProvider>
      );
    });

    // Find and click the dislike button
    const dislikeButton = screen.getByTestId("dislike-button");
    await act(async () => {
      userEvent.click(dislikeButton);
    });

    expect(dislikeButton).toBeInTheDocument();
  });
});
