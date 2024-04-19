import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileHeader from "../ProfileHeader";


jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());

jest.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: jest.fn(),
}));

jest.mock("../ReportHook", () => ({
  useReportLogic: jest.fn(),
}));

jest.mock("../FollowHook", () => ({
  useFollow: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("ProfileHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", async () => {
    require("@auth0/nextjs-auth0/client").useUser.mockImplementation(() => ({
      user: { sub: "user123" },
    }));
    require("../FollowHook").useFollow.mockImplementation(() => ({
      handleFollow: jest.fn(),
      handleUnfollow: jest.fn(),
    }));
    require("../ReportHook").useReportLogic.mockImplementation(() => ({
      isReportOpen: false,
      openReportDialog: jest.fn(),
      closeReportDialog: jest.fn(),
      handleReportSubmit: jest.fn(),
    }));

    render(<ProfileHeader postCount={5} userName="testUser" gender="Male" age={25} isOwner={true} profileName="Test Profile" />);
    expect(await screen.findByText("testUser")).toBeInTheDocument();
  });
  // it("toggles follow when clicked", async () => {
  //   const user = await userEvent.setup();
  //   const mockHandleFollow = jest.fn();
  //   const mockHandleUnfollow = jest.fn();
  
  //   require("@auth0/nextjs-auth0/client").useUser.mockImplementation(() => ({
  //     user: { sub: "user123" },
  //   }));
  //   require("../FollowHook").useFollow.mockImplementation(() => ({
  //     handleFollow: mockHandleFollow,
  //     handleUnfollow: mockHandleUnfollow,
  //   }));
  
  //   render(<ProfileHeader postCount={5} userName="testUser2" gender="Female" age={30} isOwner={false} profileName="Test Profile 2" />);
  
  //   const followButton = await screen.findByRole("button", { name: "Follow" });
  
  //   await user.click(followButton);
  //   expect(mockHandleFollow).toHaveBeenCalledTimes(1);
  
  // });


  // it("opens report dialog when 'Report Issue' button is clicked", async () => {
  //   const user = await userEvent.setup();
  //   const mockOpenReportDialog = jest.fn();
  
  //   require("@auth0/nextjs-auth0/client").useUser.mockImplementation(() => ({
  //     user: { sub: "user123" },
  //   }));
  //   require("../ReportHook").useReportLogic.mockImplementation(() => ({
  //     isReportOpen: false,
  //     openReportDialog: mockOpenReportDialog,
  //     closeReportDialog: jest.fn(),
  //     handleReportSubmit: jest.fn(),
  //     header: "",
  //     description: "",
  //     reportType: "",
  //     setHeader: jest.fn(),
  //     setDescription: jest.fn(),
  //     setReportType: jest.fn(),
  //   }));
  
  //   render(<ProfileHeader postCount={5} userName="testUser2" gender="Female" age={30} isOwner={false} profileName="Test Profile 2" />);
  
  //   const reportIssueButton = await screen.findByRole("button", { name: /Report Issue/i });
  //   await user.click(reportIssueButton);
  
  //   expect(mockOpenReportDialog).toHaveBeenCalledTimes(1);
  // });
  
  
});
