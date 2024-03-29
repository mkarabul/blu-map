import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUser } from "@auth0/nextjs-auth0/client";
import usePublicPrivateMode from "../PublicPrivateMode";
// Mocking necessary parts
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

// Helper component to test the hook
const TestComponent = ({ userID }) => {
  const { mode, loading, error, toggleMode } = usePublicPrivateMode(userID);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <>
          <div>Mode: {mode}</div>
          <button onClick={toggleMode}>Toggle Mode</button>
        </>
      )}
    </div>
  );
};

describe("usePublicPrivateMode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initially shows loading, then displays the mode", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ isPublic: true }),
    });

    useUser.mockReturnValue({ user: { sub: "user123" } });

    render(<TestComponent userID="user123" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
    expect(screen.getByText("Mode: public")).toBeInTheDocument();
  });

  it("handles toggle mode correctly", async () => {
    // Setup initial fetch to resolve user mode and subsequent fetch for toggling
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ isPublic: true }),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const user = await userEvent.setup();
    render(<TestComponent userID="user123" />);

    await waitFor(() => expect(screen.getByText("Mode: public")).toBeInTheDocument());

    await user.click(screen.getByText("Toggle Mode"));
  });

  it("displays error on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch user data"));

    render(<TestComponent userID="user123" />);

    await waitFor(() => expect(screen.getByText("Error: Failed to fetch user data")).toBeInTheDocument());
  });
});
