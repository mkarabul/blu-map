// NotificationsPage.test.jsx

import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import NotificationsPage from "../NotificationPage";
jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());


// Mocking necessary parts
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn().mockReturnValue({ user: { sub: "user123" } }),
}));

// Mock fetch globally
global.fetch = jest.fn();

describe("NotificationsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const mockNotifications = [
      { id: 1, header: "Notification 1", description: "Description 1", createdAt: "2024-04-20T12:00:00Z" },
      { id: 2, header: "Notification 2", description: "Description 2", createdAt: "2024-04-21T12:00:00Z" },
    ];
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockNotifications) });

    render(<NotificationsPage />);

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Add Notification")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Notification 1")).toBeInTheDocument();
      expect(screen.getByText("Notification 2")).toBeInTheDocument();
    });
  });

  it("adds a new notification", async () => {
    render(<NotificationsPage />);

    fireEvent.click(screen.getByText("Add Notification"));
    fireEvent.change(screen.getByPlaceholderText("Header"), { target: { value: "New Notification" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "New Description" } });
    fireEvent.click(screen.getByText("OK"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/admin/notifications/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          header: "New Notification",
          description: "New Description",
          userId: "user123"
        }),
      });
    });
  });

  it("deletes a notification", async () => {
    const mockNotifications = [
      { id: 1, header: "Notification 1", description: "Description 1", createdAt: "2024-04-20T12:00:00Z" },
      { id: 2, header: "Notification 2", description: "Description 2", createdAt: "2024-04-21T12:00:00Z" },
    ];
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockNotifications) });

    render(<NotificationsPage />);

    await waitFor(() => {
      expect(screen.getByText("Notification 1")).toBeInTheDocument();
      expect(screen.getByText("Notification 2")).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({ ok: true });

  });
});
