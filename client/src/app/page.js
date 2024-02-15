import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Your content here */}
    </main>
  );
}

// Wrap your Home component with NextUIProvider
export default function App() {
  return (
    <NextUIProvider>
      <Home />
    </NextUIProvider>
  );
}
