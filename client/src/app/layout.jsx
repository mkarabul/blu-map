import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import Navbar from "./components/navbar";
import AlertComponent from "./components/AlertComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blu-Map",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          <AlertComponent />
          <main>{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
