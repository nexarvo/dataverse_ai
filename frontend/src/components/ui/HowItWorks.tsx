"use client";

import { StickyScroll } from "./StickyScroll";

export function HowItWorks() {
  const content = [
    {
      title: "Upload",
      description:
        "Connect your data sources or upload files. DataVerse works with databases, spreadsheets, and cloud storage.",
    },
    {
      title: "Ask any data question",
      description:
        "Simply ask questions in plain English. No SQL or technical knowledge required. Get answers instantly.",
    },
    {
      title: "Get report or deep insight",
      description:
        "Receive beautiful visualizations, detailed reports, and actionable insights that drive better decisions.",
    },
  ];

  return (
    <div className="min-h-screen w-screen px-8 py-12 md:px-0 bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
