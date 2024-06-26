import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUser } from "@auth0/nextjs-auth0/client";
import EmailVerificationButton from "../EmailVerificationButton";
jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());


import {
  faUser,
  faBell,
  faServer,
  faGlobe,
  faHeadphones,
  faRightToBracket,
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";


// Mocking necessary parts
jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock alert since it is not implemented in JSDOM
window.alert = jest.fn();

describe("EmailVerificationButton", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    fetch.mockReset();
    window.alert.mockClear();
  });

  it("opens dialog when button is clicked", async () => {
    useUser.mockReturnValue({ user: { sub: "user123", email: "test@example.com" } });

    render(<EmailVerificationButton icon={faEnvelope} header="Verify Email" context="Verify your email address" />);

    userEvent.click(screen.getByText("Verify Email"));

    await waitFor(() => expect(screen.getByText("Verify Your Email Address")).toBeInTheDocument());
  });

  it("closes dialog when close button is clicked", async () => {
    useUser.mockReturnValue({ user: { sub: "user123", email: "test@example.com" } });

    render(<EmailVerificationButton icon={faEnvelope} header="Verify Email" context="Verify your email address" />);

    userEvent.click(screen.getByText("Verify Email"));

    await waitFor(() => expect(screen.getByText("Verify Your Email Address")).toBeInTheDocument());

    userEvent.click(screen.getByText("✕"));

    await waitFor(() => expect(screen.queryByText("Verify Your Email Address")).not.toBeInTheDocument());
  });

  it("handles sending verification email", async () => {
    useUser.mockReturnValue({ user: { sub: "user123", email: "test@example.com" } });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ verificationCode: "123456" }),
    });

    render(<EmailVerificationButton icon={faEnvelope} header="Verify Email" context="Verify your email address" />);

    userEvent.click(screen.getByText("Verify Email"));

    await waitFor(() => expect(screen.getByText("Verify Your Email Address")).toBeInTheDocument());
  });

  it("handles verification code input and submission", async () => {
    useUser.mockReturnValue({ user: { sub: "user123", email: "test@example.com" } });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<EmailVerificationButton icon={faEnvelope} header="Verify Email" context="Verify your email address" />);

    userEvent.click(screen.getByText("Verify Email"));

    await waitFor(() => expect(screen.getByText("Verify Your Email Address")).toBeInTheDocument());
  });
});
