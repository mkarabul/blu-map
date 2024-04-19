import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import CopyPost from "../CopyPost";


jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    };
  },
}));

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ uuid: "123" }),
  })
);

describe("CopyPost", () => {
//   beforeEach(() => {
//     fetchMock = jest.spyOn(global, "fetch").mockImplementation(jest.fn());

    // jest.mock("next/navigation", () => ({
//       useRouter() {
//         return {
//           prefetch: () => null,
//           push: jest.fn(),
//         };
//       },
//     }));
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

  it("renders without errors", async () => {
    await act(async () => {
      await render(<CopyPost tripId="123" />);
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call copy when clicked", async () => {
    const tripId = "123";
    const user = await userEvent.setup();

    await act(() => {
      render(<CopyPost tripId={tripId} />);
    });

    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });
  });
});
