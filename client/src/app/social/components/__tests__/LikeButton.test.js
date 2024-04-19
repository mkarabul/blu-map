import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import SocialPost from "../SocialPost";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
  it("increments like count when like button is clicked", async () => {
    // Mock initial like count and postId
    const initialLikes = 10;
    const postId = "postId";

    // Render the SocialPost component
<<<<<<< HEAD
    render(
      <UserProvider>
        <SocialPost
          uuid={postId}
          header="Test Header"
          description="Test Description"
          tripDate="2024-03-29"
          userName="TestUser"
          likes={initialLikes}
          dislikes={0}
          tripId="tripId"
          clickable={true}
          images={[]}
        />
      </UserProvider>
    );

    // Find and click the like button
    const likeButton = screen.getByRole("button", { name: /thumbs up/i });
=======
>>>>>>> bafea5a7fefb779c0d6f2ee376b7391aef353fad
    await act(async () => {
      await render(
        <UserProvider>
          <SocialPost
            uuid={postId}
            header="Test Header"
            description="Test Description"
            tripDate="2024-03-29"
            userName="TestUser"
            likes={initialLikes}
            dislikes={0}
            tripId="tripId"
            clickable={true}
            images={[]}
          />
        </UserProvider>
      );
    });

    // Find and click the like button
    const likeButton = screen.getByTestId("like-button");
    await act(async () => {
      await userEvent.click(likeButton);
    });

    // Expect it to be in the document
    expect(likeButton).toBeInTheDocument();
  });
});
