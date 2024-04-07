import React from "react";
import FAQAccordion from "./components/FAQAccordion";

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
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      >
        <h2 className="text-xl mb-5">Basic tutorial on how to get started</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/K4TOrB7at0Y"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
