import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import AddActivityButton from "../AddActivityButton";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

global.crypto.randomUUID = jest.fn(() => "1234");

describe("AddActivityButton", () => {
  it("renders without errors", () => {
    act(() => {
      render(
        <AddActivityButton
          addActivity={() => {}}
          defaultStart={0}
          defaultEnd={0}
        />
      );
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls addActivity when clicked", async () => {
    const addActivity = jest.fn();
    const user = await userEvent.setup();
    act(() => {
      render(
        <AddActivityButton
          addActivity={addActivity}
          defaultStart={0}
          defaultEnd={0}
        />
      );
    });

    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });

    expect(addActivity).toHaveBeenCalled();
  });
});
