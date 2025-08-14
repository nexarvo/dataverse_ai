"use client";

import { useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Database,
  BarChart3,
  MessageSquare,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FeatureCard } from "./grid-feature-cards";
import { AI_Prompt } from "./animated-ai-input";

const Hero2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Gradient background with grain effect */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0 ">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto flex items-center justify-between px-4 py-4 mt-6">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold text-white">DataVerse</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <NavItem label="Features" />
              <NavItem label="How it Works" />
              <NavItem label="About" />
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://cal.com/usman-ghani-546/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 rounded-full bg-transparent px-4 text-base font-medium text-white hover:bg-white/10 flex items-center border border-white"
              >
                Book Demo
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col p-4 bg-black/95 md:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                    <span className="font-bold">⚡</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-white">
                    DataVerse
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-6">
                <MobileNavItem label="Features" />
                <MobileNavItem label="How it Works" />
                <MobileNavItem label="Use Cases" />
                <MobileNavItem label="About" />
                <a
                  href="https://cal.com/usman-ghani-546/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 rounded-full bg-white px-4 text-sm font-medium text-black hover:bg-white/90"
                >
                  Book Demo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero section */}
        <div className="container mx-auto mt-12 px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Turn Your Raw Data into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ">
              Instant Answers
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            DataVerse helps your team create reports, dashboards, and insights
            by simply asking questions in plain English.
          </p>
          <div className="relative mx-auto mt-6 w-full max-w-6xl flex justify-center">
            <AI_Prompt />
          </div>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              href="https://cal.com/usman-ghani-546/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 flex items-center rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
            >
              Book a 15-min Discovery Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function NavItem({
  label,
  hasDropdown,
}: {
  label: string;
  hasDropdown?: boolean;
}) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    const sectionMap: { [key: string]: string } = {
      Features: "features",
      "How it Works": "how-it-works",
      "Use Cases": "use-cases",
      About: "about",
    };

    const sectionId = sectionMap[label];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
    >
      <span>{label}</span>
      {hasDropdown && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </button>
  );
}

function MobileNavItem({ label }: { label: string }) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    const sectionMap: { [key: string]: string } = {
      Features: "features",
      "How it Works": "how-it-works",
      "Use Cases": "use-cases",
      About: "about",
    };

    const sectionId = sectionMap[label];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white w-full text-left"
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 text-gray-400" />
    </button>
  );
}

export { Hero2 };
