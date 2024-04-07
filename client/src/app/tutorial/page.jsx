import React from "react";
import FAQAccordion from "./components/FAQAccordion";
import Videos from "./components/Videos";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          marginTop: "1rem",
          marginBottom: "5rem",
        }}
      >
        <h1>Tutorial Page</h1>
      </div>
      <div
        style={{
          fontSize: "2rem",
          marginBottom: "3rem",
          textDecoration: "underline",
        }}
      >
        Frequently Asked Questions
      </div>
      <FAQAccordion />
      <Videos />
    </div>
  );
}
