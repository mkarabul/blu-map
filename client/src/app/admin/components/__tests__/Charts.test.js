// import "@testing-library/jest-dom";
// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import ChartsPage from "../Charts";

// // Mocking necessary parts
// jest.mock("@auth0/nextjs-auth0/client", () => ({
//   useUser: jest.fn(),
// }));

// // Mock fetch globally
// global.fetch = jest.fn();

// describe("ChartsPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders loading state initially", () => {
//     render(<ChartsPage />);
//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   it("renders charts after loading data", async () => {
//     const mockUserData = [
//       { age: 25, gender: "Male", isSuspended: false, isVerified: true },
//       { age: 35, gender: "Female", isSuspended: false, isVerified: true },
//     ];

//     const mockSocialTripData = [
//       { createdAt: "2024-04-18T10:00:00.000Z" },
//       { createdAt: "2024-04-18T11:00:00.000Z" },
//       { createdAt: "2024-04-18T12:00:00.000Z" },
//     ];

//     let retryCount = 0;
//     const maxRetries = 5;

//     const fetchData = async () => {
//       try {
//         const userDataResponse = await fetchUserData();
//         const socialTripDataResponse = await fetchSocialTripData();

//         return { userData: userDataResponse, socialTripData: socialTripDataResponse };
//       } catch (error) {
//         if (retryCount < maxRetries) {
//           retryCount++;
//           return fetchData();
//         } else {
//           throw new Error(`Exceeded maximum retries (${maxRetries})`);
//         }
//       }
//     };

//     const fetchUserData = async () => {
//       return fetchResponse('/api/admin/', mockUserData);
//     };

//     const fetchSocialTripData = async () => {
//       return fetchResponse('/api/profile-trip/', mockSocialTripData);
//     };

//     const fetchResponse = async (url, data) => {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       return data;
//     };

//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockUserData),
//     }).mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockSocialTripData),
//     });

//     render(<ChartsPage />);

//     await waitFor(() => {
//       expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
//       expect(screen.getByText("Age Demographics")).toBeInTheDocument();
//       expect(screen.getByText("Gender Demographics")).toBeInTheDocument();
//       expect(screen.getByText("User Status")).toBeInTheDocument();
//       expect(screen.getByText("Verification Status")).toBeInTheDocument();
//       expect(screen.getByText("User Creation Time Series")).toBeInTheDocument();
//       expect(screen.getByText("Profile Trip Time Series")).toBeInTheDocument();
//     });
//   });

//   it("handles error during data fetch", async () => {
//     global.fetch.mockRejectedValueOnce(new Error("Failed to fetch data"));

//     render(<ChartsPage />);

//     await waitFor(() => {
//       expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
//     });
//   });
// });
