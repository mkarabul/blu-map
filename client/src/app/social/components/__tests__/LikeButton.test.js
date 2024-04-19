import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import SocialPost from "../SocialPost";
import { UserProvider } from "@auth0/nextjs-auth0/client";

describe("SocialPost", () => {
  it("increments like count when like button is clicked", async () => {
    // Mock initial like count and postId
    const initialLikes = 10;
    const postId = "postId";

    // Render the SocialPost component
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
    await act(async () => {
      userEvent.click(likeButton);
    });

    // Check if the like count has increased by 1
    expect(screen.getByText(`${initialLikes + 1}`)).toBeInTheDocument();
  });
});
